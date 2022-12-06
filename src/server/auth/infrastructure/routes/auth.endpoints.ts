import { z } from 'zod';

import { NotFound } from '@/SharedServer/infrastructure/schemas/NotFound.schema';
import {
	makeEndpointPrivateWithDocs,
	makeEndpointWithDocs,
} from '@/SharedServer/infrastructure/utils/endpointHelpers';
import { UserEndpoint } from '@/UsersServer/infrastructure/schemas';

// type Mutable<T> = ReadonlyArray<T>;
export const authEndpoints = [
	makeEndpointWithDocs({
		method: 'post',
		path: '/auth/login',
		alias: 'login',
		description: 'login user',
		requestFormat: 'json',
		status: 200,
		protected: true,
		parameters: [
			{
				name: 'credentials',
				type: 'Body',
				schema: z.object({
					email: z.string(),
					password: z.string(),
				}),
			},
		],
		response: z.object({
			accessToken: z.string(),
		}),
	}),
	makeEndpointPrivateWithDocs({
		method: 'get',
		path: '/auth/me',
		alias: 'userInfo',
		description: 'obtain user info',
		response: UserEndpoint,
		error: [
			{
				status: 404,
				description: 'user not found',
				schema: NotFound,
			},
		],
	}),
] as const;
