import { User } from '@/UsersServer/domain';
import { UserEndpoint } from '@/UsersServer/infrastructure/schemas';

export function UserModelToEndpoint(user: User): UserEndpoint {
	return UserEndpoint.parse(user);
}
