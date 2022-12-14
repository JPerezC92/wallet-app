import { z } from 'zod';

import { ErrorResponse } from '@/SharedServer/infrastructure/schemas';
import { makeApiWithDocs } from '@/SharedServer/infrastructure/utils/endpointHelpers';
import { TransactionSchema } from '@/TransactionsServer/infrastructure/schemas';

export const transactionsEndpoints = makeApiWithDocs([
	{
		method: 'get',
		path: '/transactions',
		alias: 'getTransactions',
		description: 'get all transactions',
		immutable: false,
		response: z.array(TransactionSchema),
		status: 200,
		responseDescription: '',
		errors: [
			{
				status: 500,
				description: '',
				schema: z.object({}),
			},
			{
				status: 404,
				description: 'transaction not found',
				schema: ErrorResponse,
			},
		],
	},
	{
		method: 'get',
		path: '/transactions/:id',
		alias: 'getTransaction',
		description: 'get transaction',
		immutable: false,
		response: TransactionSchema,
		status: 200,
		responseDescription: '',
		errors: [
			{
				status: 500,
				description: 'server error',
				schema: z.object({}),
			},
		],
	},
]);
