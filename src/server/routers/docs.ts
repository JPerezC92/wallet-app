import { makeApi } from '@zodios/core';
import { openApiBuilder } from '@zodios/openapi';
import { serve, setup } from 'swagger-ui-express';
import { z } from 'zod';

import { FrontendFrameworksDef } from '@/src/common/api';
import { ctx } from '@/src/server/context';

const DocsDef = makeApi([
	{
		method: 'get',
		path: '/docs/swagger.json',
		response: z.object({}),
		alias: 'docs',
		description: 'Documentation',
	},
]);

const openApiDocument = openApiBuilder({
	title: 'Zodios api',
	version: '1.0.0',
	description: 'A simple API',
})
	.addServer({ url: '/api/v1', description: 'wallet api test' })
	.addPublicApi([...FrontendFrameworksDef])
	.build();

export const docsRouter = ctx.router(DocsDef);

docsRouter.get('/docs/swagger.json', (_, res) => {
	return res.json(openApiDocument);
});

docsRouter.use(
	'/docs',
	setup(undefined, {
		swaggerUrl: '/api/v1/docs/swagger.json',
		customCssUrl:
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
		swaggerOptions: { configUrl: '/api/v1/docs' },
	})
);

docsRouter.use('/', serve);
