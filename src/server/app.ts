import { authRouter } from '@/AuthServer/infrastructure/routes/user.routes';
import { docsRouter } from '@/SharedServer/infrastructure/routers/docs';
import { frameworksRouter } from '@/SharedServer/infrastructure/routers/frameworks';
import { ctx } from '@/src/server/context';
import { usersRouter } from '@/UsersServer/infrastructure/routes/users.routes';

export const app = ctx.nextApp();
app.use('/api/v1', authRouter, usersRouter, frameworksRouter, docsRouter);
