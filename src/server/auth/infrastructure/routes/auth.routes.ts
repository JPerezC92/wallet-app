import { AuthLogin, AuthSearchUserInfo } from '@/AuthServer/application';
import { AuthTokenInvalid, AuthTokenWasNotProvided } from '@/AuthServer/domain';
import { authEndpoints } from '@/AuthServer/infrastructure/routes/auth.endpoints';
import {
	AuthAccessTokenCipher,
	BcryptPasswordCipher,
} from '@/AuthServer/infrastructure/services';
import { ctx } from '@/Server/context';
import { UnitOfWork } from '@/Server/db/UnitOfWork';
import {
	BadRequest,
	ExceptionListener,
	NotFound,
	Unauthorized,
} from '@/SharedServer/infrastructure/errors';
import { UserInvalidCredentials, UserNotFound } from '@/UsersServer/domain';
import { UserModelToEndpoint } from '@/UsersServer/infrastructure/adapters';
import { UsersPrismaRepository } from '@/UsersServer/infrastructure/repos';

export const authRouter = ctx.router([...authEndpoints]);

authRouter.post('/auth/login', async (req, res) => {
	const { email, password } = req.body;
	const uow = UnitOfWork();

	try {
		const accessToken = await uow.transaction(async (db) => {
			return AuthLogin(
				BcryptPasswordCipher(),
				AuthAccessTokenCipher(),
				UsersPrismaRepository(db)
			).execute({ email, password });
		});

		return res.status(200).json({ accessToken });
	} catch (error) {
		const errorResponse = ExceptionListener([
			[UserInvalidCredentials.name, BadRequest],
		]).mapError(error);

		return res.status(errorResponse.statusCode).json(errorResponse.response());
	}
});

authRouter.get('/auth/me', async (req, res) => {
	const accessToken = req.headers.authorization;
	const uow = UnitOfWork();

	try {
		const user = await uow.transaction(async (db) => {
			return AuthSearchUserInfo(
				UsersPrismaRepository(db),
				AuthAccessTokenCipher(),
				UserModelToEndpoint
			).execute({ accessToken });
		});

		return res.status(200).json(user);
	} catch (error) {
		const errorResponse = ExceptionListener([
			[UserNotFound.name, NotFound],
			[AuthTokenWasNotProvided.name, BadRequest],
			[AuthTokenInvalid.name, Unauthorized],
		]).mapError(error);

		return res.status(errorResponse.statusCode).json(errorResponse.response());
	}
});
