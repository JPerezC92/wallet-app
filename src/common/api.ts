import { z } from 'zod';

import { makeApiWithDocs } from '@/SharedServer/infrastructure/utils/endpointHelpers';

const FrameworkSCHEMA = z.object({ data: z.string() });

export const FrontendFrameworksDef = makeApiWithDocs([
	{
		method: 'post',
		path: '/frontend-frameworks',
		status: 200,
		response: FrameworkSCHEMA,
		alias: 'createFramework',
		description: 'create a new framework',
		parameters: [
			{
				name: 'names',
				type: 'Body',
				schema: z.object({
					names: z.string(),
				}),
				description: 'framework name',
			},
		],
		errors: [
			{
				status: 400,
				description: 'Bad request',
				schema: z.object({
					context: z.string(),
					error: z.array(
						z.object({
							code: z.string(),
							expected: z.string(),
							recieved: z.string(),
							path: z.array(z.any()),
							message: z.string(),
						})
					),
				}),
			},
		],
	},
	{
		method: 'get',
		path: '/frontend-frameworks',
		response: z.object({ data: z.array(z.string()) }),
		alias: 'getFrameworks',
		description: 'get a list of frameworks',
	},
	{
		method: 'get',
		path: '/frontend-frameworks/:id',
		response: z.object({ data: z.string() }),
		alias: 'getFramework',
		description: 'get a framework by id',
		parameters: [
			{
				name: 'id',
				type: 'Path',
				schema: z.string(),
				description: 'framework id',
			},
		],
		errors: [
			{
				status: 404,
				description: 'User not found',
				schema: z.object({
					error: z.object({
						userId: z.number(),
						code: z.string(),
						message: z.string(),
					}),
				}),
			},
		],
	},
]);
