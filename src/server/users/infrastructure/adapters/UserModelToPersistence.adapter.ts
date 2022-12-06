import { UserStored } from '@prisma/client';

import { User } from '@/UsersServer/domain';

export function UserModelToPersistence(user: User): UserStored {
	return { ...user };
}
