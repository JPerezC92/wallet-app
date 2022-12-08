import { ErrorResponse } from '@/SharedServer/infrastructure/schemas';
import { makeApiWithDocs } from '@/SharedServer/infrastructure/utils/endpointHelpers';
import { UserCreate, UserEndpoint } from '@/UsersServer/infrastructure/schemas';

export const userEndpoints = makeApiWithDocs([
	{
		method: 'post',
		path: '/users',
		alias: 'createUser',
		description: 'create user',
		requestFormat: 'json',
		immutable: false,
		parameters: [{ name: 'UserCreate', schema: UserCreate, type: 'Body' }],
		response: UserEndpoint,
		status: 200,
		responseDescription: 'New user created successfully',
		errors: [
			{
				status: 500,
				description: 'Internal Error',
				schema: ErrorResponse,
			},
			{
				status: 409,
				description: 'Conflict',
				schema: ErrorResponse,
			},
		],
	},
]);
