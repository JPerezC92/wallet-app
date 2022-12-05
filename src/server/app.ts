import { authRouter } from '@/AuthServer/infrastructure/routes/user.routes';
import { docsRouter } from '@/SharedServer/infrastructure/routers/docs';
import { ctx } from '@/src/server/context';
import { usersRouter } from '@/UsersServer/infrastructure/routes/users.routes';

const app = ctx.nextApp();

export function initApp() {
	app.use('/api/v1', docsRouter, authRouter, usersRouter);
	return app;
}
