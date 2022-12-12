import { AccountStored, UserStored } from '@prisma/client';

import { AccountPersistenseToModel } from '@/Server/account/infrastructure/adapters';
import { User } from '@/UsersServer/domain';

export function UserPersistenceToModel(
	userStored: UserStored & {
		AccountStored: AccountStored[];
	}
): User {
	return new User({
		...userStored,
		accountList: userStored.AccountStored.map(AccountPersistenseToModel),
	});
}
