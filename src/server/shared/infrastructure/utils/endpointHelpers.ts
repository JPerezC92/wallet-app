import { makeApi, ZodiosEndpointDefinitions } from '@zodios/core';
import { Narrow } from '@zodios/core/lib/utils.types';

export function ApiDefinitionsFns() {
	let _ApiDefinitions: ZodiosEndpointDefinitions = [];
	return {
		getAll() {
			return [..._ApiDefinitions];
		},
		register(newApiDefinitions: ZodiosEndpointDefinitions) {
			_ApiDefinitions = [..._ApiDefinitions, ...newApiDefinitions];
		},
	};
}

export const ApiDefinitions = ApiDefinitionsFns();

export function makeApiWithDocs<Api extends ZodiosEndpointDefinitions>(
	definitions: Narrow<Api>
): Api {
	const apiDefinitions = makeApi(definitions);

	ApiDefinitions.register(apiDefinitions);

	return apiDefinitions;
}
