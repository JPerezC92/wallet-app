import { DomainError } from '@/SharedServer/domain';

export class UserNotFound extends DomainError {
	public readonly name = UserNotFound.name;
	public readonly message: string = 'User was not found';
	public readonly code = 'USER_NOT_FOUND';

	constructor() {
		super();
	}
}
