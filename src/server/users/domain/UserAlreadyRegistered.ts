import { DomainError } from '@/SharedServer/domain/DomainError';

export class UserAlreadyRegistered extends DomainError {
	public readonly name = UserAlreadyRegistered.name;
	public readonly message = 'Seems like you are already registered';
	readonly code = 'USER_ALREADY_REGISTERED';

	constructor() {
		super();
	}
}
