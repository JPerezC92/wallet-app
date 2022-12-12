import { CurrencyDefault } from '@/Server/account/domain/CurrencyDefault';
import { Repository } from '@/SharedServer/infrastructure/repos/Repository';
import { UsersRepository } from '@/UsersServer/domain/users.repository';
import { UserPersistenceToModel } from '@/UsersServer/infrastructure/adapters';

export const UsersPrismaRepository: Repository<UsersRepository> = (db) => {
	return {
		register: async (user) => {
			await db.userStored.create({
				data: {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					password: user.password,
					AccountStored: {
						create: { money: 0, currencyValue: CurrencyDefault },
					},
				},
			});
		},
		findByEmail: async (email) => {
			const user = await db.userStored.findUnique({
				where: { email },
				include: { AccountStored: true },
			});

			if (!user) return;

			return UserPersistenceToModel(user);
		},
	};
};
