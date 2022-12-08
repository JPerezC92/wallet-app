import { Repository } from '@/SharedServer/infrastructure/repos/Repository';
import { UsersRepository } from '@/UsersServer/domain/users.repository';
import { UserPersistenceToModel } from '@/UsersServer/infrastructure/adapters/UserPersistenceToModel.adapter';

export const UsersPrismaRepository: Repository<UsersRepository> = (db) => {
	return {
		register: async (user) => {
			const newUser = await db.userStored.create({
				data: {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					password: user.password,
				},
			});
			return UserPersistenceToModel(newUser);
		},
		findByEmail: async (email) => {
			const user = await db.userStored.findUnique({
				where: { email },
			});

			if (!user) return;

			return user;
		},
	};
};
