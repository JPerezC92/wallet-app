import { openApiBuilder } from '@zodios/openapi';

import { ApiDefinitions } from '@/SharedServer/infrastructure/utils/endpointHelpers';

export const OpenApiDocsGenerate = () =>
	openApiBuilder({
		title: 'Wallet api',
		version: '1.0.0',
		description: 'A simple API',
	})
		.addServer({ url: '/api/v1', description: 'wallet api' })
		.addPublicApi(ApiDefinitions.getAll())
		.build();
