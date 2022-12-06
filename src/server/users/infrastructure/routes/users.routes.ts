import { BcryptPasswordEncryptor } from '@/AuthServer/infrastructure/services';
import { UnitOfWork } from '@/Server/db/UnitOfWork';
import { UuidJSGenerator } from '@/SharedServer/infrastructure/services';
import { ctx } from '@/src/server/context';
import { UserRegister } from '@/UsersServer/application/UserRegister';
import { UserModelToEndpoint } from '@/UsersServer/infrastructure/adapters/UserModelToEndpoint.adapter';
import { UsersPrismaRepository } from '@/UsersServer/infrastructure/repos';

import { userEndpoints } from './users.endpoints';

export const usersRouter = ctx.router(userEndpoints);

usersRouter.post('/users', async (req, res) => {
	const userCreate = req.body;
	// req.socket.remoteAddress;
	const uow = UnitOfWork();

	const newUser = await uow.transaction(async (db) => {
		return await UserRegister(
			UsersPrismaRepository(db),
			UuidJSGenerator(),
			BcryptPasswordEncryptor(),
			UserModelToEndpoint
		).execute({
			firstName: userCreate.firstName,
			lastName: userCreate.lastName,
			email: userCreate.email,
			password: userCreate.password,
		});
	});

	return res.status(200).json(newUser);
});
