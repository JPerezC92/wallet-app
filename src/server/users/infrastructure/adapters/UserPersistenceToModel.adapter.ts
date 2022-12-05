import { UserStored } from '@prisma/client';

import { User } from '@/UsersServer/domain';

export function UserPersistenceToModel(userStored: UserStored): User {
	return new User(
		userStored.id,
		userStored.firstName,
		userStored.lastName,
		userStored.email,
		userStored.password
	);
}
export function UserModelToPersistence(userStored: User): UserStored {
	return { ...userStored };
}
