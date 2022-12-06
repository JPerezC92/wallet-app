import { AuthSearchUserInfo } from '@/AuthServer/application/AuthSearchUserInfo';
import { authEndpoints } from '@/AuthServer/infrastructure/routes/auth.endpoints';
import { AuthAccessTokenEncoder } from '@/AuthServer/infrastructure/services';
import { ctx } from '@/Server/context';
import { UnitOfWork } from '@/Server/db/UnitOfWork';
import { UserModelToEndpoint } from '@/UsersServer/infrastructure/adapters';
import { UsersPrismaRepository } from '@/UsersServer/infrastructure/repos';

export const authRouter = ctx.router([...authEndpoints]);

authRouter.post('/auth/login', async (req, res) => {
	const { email, password } = req.body;
	const uow = UnitOfWork();

	const accessToken = await uow.transaction(async (db) => {
		const user = await db.userStored.findFirst({
			where: { email, password },
		});

		if (!user) throw new Error('user not found');

		return AuthAccessTokenEncoder().encode({ email: user.email, id: user.id });
	});

	return res.status(200).json({
		accessToken,
	});
});

authRouter.get('/auth/me', async (req, res) => {
	const accessToken = req.headers.authorization;
	if (!accessToken) return;

	const uow = UnitOfWork();

	const user = await uow.transaction(async (db) => {
		return await AuthSearchUserInfo(
			UsersPrismaRepository(db),
			AuthAccessTokenEncoder(),
			UserModelToEndpoint
		).execute({ accessToken });
	});

	return res.status(200).json(user);
});
