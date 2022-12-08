import { DomainError } from '@/SharedServer/domain';

export class AuthTokenWasNotProvided extends DomainError {
	public readonly name = AuthTokenWasNotProvided.name;
	public readonly code = 'TOKEN_NOT_PROVIDED';
	public message = 'Make sure that you are sending a token';

	constructor() {
		super();
	}
}
