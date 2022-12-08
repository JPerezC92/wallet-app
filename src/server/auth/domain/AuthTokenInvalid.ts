import { DomainError } from '@/SharedServer/domain';

export class AuthTokenInvalid extends DomainError {
	public readonly name = AuthTokenInvalid.name;
	public readonly code = 'INVALID_TOKEN';
	public readonly message = 'Invalid access credentials';

	constructor() {
		super();
	}
}
