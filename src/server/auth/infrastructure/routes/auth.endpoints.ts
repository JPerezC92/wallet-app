import {
	AuthLoginResponse,
	Credentials,
} from '@/AuthServer/infrastructure/schemas';
import { ErrorResponse } from '@/SharedServer/infrastructure/schemas';
import {
	makeEndpointPrivateWithDocs,
	makeEndpointWithDocs,
} from '@/SharedServer/infrastructure/utils/endpointHelpers';
import { UserEndpoint } from '@/UsersServer/infrastructure/schemas';

export const authEndpoints = [
	makeEndpointWithDocs({
		method: 'post',
		path: '/auth/login',
		alias: 'login',
		description: 'login user',
		requestFormat: 'json',
		status: 200,
		protected: true,
		response: AuthLoginResponse,
		parameters: [
			{
				name: 'credentials',
				type: 'Body',
				schema: Credentials,
			},
		],
		errors: [
			{
				status: 401,
				description: 'Invalid Credentials',
				schema: ErrorResponse,
			},
		],
	}),
	makeEndpointPrivateWithDocs({
		method: 'get',
		path: '/auth/me',
		alias: 'userInfo',
		description: 'obtain user info',
		response: UserEndpoint,
		errors: [
			{
				status: 400,
				description: 'Token not found',
				schema: ErrorResponse,
			},
			{
				status: 401,
				description: 'Invalid token',
				schema: ErrorResponse,
			},
			{
				status: 404,
				description: 'User not found',
				schema: ErrorResponse,
			},
		],
	}),
] as const;
