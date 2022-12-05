import { UnitOfWork } from '@/Server/db/UnitOfWork';
import { UuidJSGenerator } from '@/SharedServer/infrastructure/utils/UuidJSGenerator';
import { ctx } from '@/src/server/context';
import { UserRegister } from '@/UsersServer/application/UserRegister';
import { UsersPrismaRepository } from '@/UsersServer/infrastructure/repos/users.prisma.repository';

import { userEndpoints } from './users.endpoints';

export const usersRouter = ctx.router(userEndpoints);

usersRouter.post('/users', async (req, res) => {
	const userCreate = req.body;
	const uow = UnitOfWork();

	const newUser = await uow.transaction(async (db) => {
		return await UserRegister(
			UsersPrismaRepository(db),
			UuidJSGenerator()
		).execute({
			firstName: userCreate.firstName,
			lastName: userCreate.lastName,
			email: userCreate.email,
			password: userCreate.password,
		});
	});

	return res.status(200).json({
		...userCreate,
		...newUser,
		id: '12',
		roleId: 1,
		points: 0,
		createdAt: 'date',
		updatedAt: 'date',
	});
});
