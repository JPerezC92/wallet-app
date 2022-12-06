import {
	makeApi,
	makeEndpoint,
	ZodiosEndpointDefinition,
	ZodiosEndpointDefinitions,
} from '@zodios/core';
import { Narrow } from '@zodios/core/lib/utils.types';

export function ApiDefinitionsFns() {
	let _ApiDefinitions: ZodiosEndpointDefinitions = [];
	return {
		getAll() {
			return [..._ApiDefinitions];
		},
		registerApi(newApiDefinitions: ZodiosEndpointDefinitions) {
			_ApiDefinitions = [..._ApiDefinitions, ...newApiDefinitions];
		},
		registerEndpoint(newApiDefinition: ZodiosEndpointDefinition) {
			_ApiDefinitions = [..._ApiDefinitions, newApiDefinition];
		},
	};
}

export const PublicApiDefinitions = ApiDefinitionsFns();
export const PrivateApiDefinitions = ApiDefinitionsFns();

export function makeEndpointWithDocs<T extends ZodiosEndpointDefinition<any>>(
	endpoint: Narrow<T>
): T {
	const _endpoint = makeEndpoint(endpoint);
	PublicApiDefinitions.registerEndpoint(_endpoint);
	return _endpoint;
}

export function makeEndpointPrivateWithDocs<
	T extends ZodiosEndpointDefinition<any>
>(endpoint: Narrow<T>): T {
	const _endpoint = makeEndpoint(endpoint);
	PrivateApiDefinitions.registerEndpoint(_endpoint);
	return _endpoint;
}

export function makeApiWithDocs<Api extends ZodiosEndpointDefinitions>(
	definitions: Narrow<Api>
): Api {
	const apiDefinitions = makeApi(definitions);

	PublicApiDefinitions.registerApi(apiDefinitions);

	return apiDefinitions;
}

export function makeApiProtectedWithDocs<Api extends ZodiosEndpointDefinitions>(
	definitions: Narrow<Api>
): Api {
	const apiDefinitions = makeApi(definitions);

	PrivateApiDefinitions.registerApi(apiDefinitions);

	return apiDefinitions;
}
