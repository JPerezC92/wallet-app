import { z } from 'zod';

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
		responseDescription: 'new user created successfully',
		errors: [
			{
				status: 500,
				description: '',
				schema: z.object({}),
			},
		],
	},
]);
