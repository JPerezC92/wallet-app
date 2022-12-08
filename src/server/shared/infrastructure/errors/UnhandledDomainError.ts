import { DomainError } from '@/SharedServer/domain';
import { ExceptionListener } from '@/SharedServer/infrastructure/errors';

export class UnhandledDomainError {
	readonly code = 'UNHANDLED_DOMAIN_ERROR';
	readonly message = `make sure that you'r handling the domain error on the ${ExceptionListener.name} function`;
	readonly error: DomainError;

	constructor(error: DomainError) {
		this.error = error;
	}
}
