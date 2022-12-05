import { z } from 'zod';

import { NotFound } from '@/SharedServer/infrastructure/schemas/NotFound.schema';
import { makeApiWithDocs } from '@/SharedServer/infrastructure/utils/endpointHelpers';
import { User } from '@/UsersServer/infrastructure/schemas';

export const authEndpoints = makeApiWithDocs([
	{
		method: 'post',
		path: '/auth/login',
		alias: 'login',
		description: 'login user',
		response: z.object({
			accessToken: z.string(),
		}),
	},
	{
		method: 'get',
		path: '/auth/me',
		alias: 'userInfo',
		description: 'obtain user info',
		response: User,
		error: [
			{
				status: 404,
				description: 'user not found',
				schema: NotFound,
			},
		],
	},
]);
