import { DomainError } from '@/SharedServer/domain/DomainError';
import {
	InternalServerError,
	UnhandledDomainError,
} from '@/SharedServer/infrastructure/errors';

import { ErrorResponse } from './ResponseError';

// interface ExceptionMapping {
// 	[key: string]: new (code: string, message: string) => ErrorResponse;
// }

type ExceptionMapping = [
	DomainError['name'],
	new (code: string, message: string) => ErrorResponse
][];

export function ExceptionListener(exceptionList: ExceptionMapping) {
	const mapError = (error: unknown): ErrorResponse => {
		const _exceptionList = new Map(exceptionList);

		if (!DomainError.isDomainError(error)) {
			console.log(error);
			return new InternalServerError();
		}

		const Exception = _exceptionList.get(error.name);

		if (!Exception) throw new UnhandledDomainError(error);

		return new Exception(error.code, error.message);
	};

	return { mapError };
}
