import { makeApi } from '@zodios/core';
import { serve, setup } from 'swagger-ui-express';
import { z } from 'zod';

import { OpenApiDocsGenerate } from '@/SharedServer/infrastructure/utils/OpenApiDocsGenerate';
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

export const docsRouter = ctx.router(DocsDef);

docsRouter.get('/docs/swagger.json', (_, res) => {
	return res.json(OpenApiDocsGenerate());
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
