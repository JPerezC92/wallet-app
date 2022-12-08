import { DomainError } from '@/SharedServer/domain';

export class UserInvalidCredentials extends DomainError {
	public readonly name = UserInvalidCredentials.name;
	public readonly code = 'INVALID_CREDENTIALS';
	public readonly message: string = 'Verify your email and password';

	constructor() {
		super();
	}
}
