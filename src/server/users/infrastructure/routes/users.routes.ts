import { BcryptPasswordCipher } from '@/AuthServer/infrastructure/services';
import { UnitOfWork } from '@/Server/db/UnitOfWork';
import {
	Conflict,
	ExceptionListener,
} from '@/SharedServer/infrastructure/errors';
import { UuidJSGenerator } from '@/SharedServer/infrastructure/services';
import { ctx } from '@/src/server/context';
import { UserRegister } from '@/UsersServer/application';
import { UserAlreadyRegistered } from '@/UsersServer/domain';
import { UserModelToEndpoint } from '@/UsersServer/infrastructure/adapters';
import { UsersPrismaRepository } from '@/UsersServer/infrastructure/repos';

import { userEndpoints } from './users.endpoints';

export const usersRouter = ctx.router(userEndpoints);

usersRouter.post('/users', async (req, res) => {
	const userCreate = req.body;
	const uow = UnitOfWork();

	try {
		const newUser = await uow.transaction(async (db) => {
			return UserRegister(
				UsersPrismaRepository(db),
				UuidJSGenerator(),
				BcryptPasswordCipher(),
				UserModelToEndpoint
			).execute({
				firstName: userCreate.firstName,
				lastName: userCreate.lastName,
				email: userCreate.email,
				password: userCreate.password,
			});
		});

		return res.status(200).json(newUser);
	} catch (error) {
		const errorResponse = ExceptionListener([
			[UserAlreadyRegistered.name, Conflict],
		]).mapError(error);

		return res.status(errorResponse.statusCode).json(errorResponse.response());
	}
});
