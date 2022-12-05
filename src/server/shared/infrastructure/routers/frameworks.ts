import { FrontendFrameworksDef } from '@/src/common/api';
import { ctx } from '@/src/server/context';

const frameworks = ['react', 'angular', 'vue', 'svelte'];

export const frameworksRouter = ctx.router(FrontendFrameworksDef);
frameworksRouter.get('/frontend-frameworks', (_req, res) => {
	res.status(200).json({ data: frameworks });
});

frameworksRouter.get('/frontend-frameworks/:id', (req, res) => {
	const id = Number(req.params.id);
	const framework = frameworks.at(id || 1);

	if (!framework) {
		return res
			.status(404)
			.json({ error: { code: '', message: '', userId: id } });
	}

	return res.status(200).json({ data: framework });
});

frameworksRouter.post('/frontend-frameworks', (req, res) => {
	return res.status(200).json({ data: req.body.names });
});
