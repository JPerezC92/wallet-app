import { authEndpoints } from '@/AuthServer/infrastructure/routes/auth.endpoints';
import { ctx } from '@/Server/context';

export const authRouter = ctx.router(authEndpoints);

authRouter.get('/auth/me', (req, res) => {
	return res.status(200).json({});
});
