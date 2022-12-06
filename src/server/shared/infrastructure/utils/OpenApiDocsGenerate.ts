import { bearerAuthScheme, openApiBuilder } from '@zodios/openapi';

import {
	PrivateApiDefinitions,
	PublicApiDefinitions,
} from '@/SharedServer/infrastructure/utils/endpointHelpers';

export const OpenApiDocsGenerate = () =>
	openApiBuilder({
		title: 'Wallet api',
		version: '1.0.0',
		description: 'A simple API',
	})
		.addServer({ url: '/api/v1', description: 'wallet api' })
		.addPublicApi(PublicApiDefinitions.getAll())
		.addSecurityScheme('BearerAuth', bearerAuthScheme())
		.addProtectedApi('BearerAuth', PrivateApiDefinitions.getAll())
		.build();
