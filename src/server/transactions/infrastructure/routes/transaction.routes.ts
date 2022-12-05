import { ctx } from '@/src/server/context';
import { transactionsEndpoints } from '@/TransactionsServer/infrastructure/routes/transaction.endpoints';
import { TransactionModel } from '@/TransactionsServer/infrastructure/schemas';

export const usersRouter = ctx.router(transactionsEndpoints);

usersRouter.get('/transactions', async (_req, res) => {
	const transactions = await TransactionModel.findAll();
	if (!transactions)
		return res
			.status(404)
			.json({ error: { message: 'No transactions found', code: 404 } });
	return res.status(200).json(transactions);
});

usersRouter.get('/transactions/:id', async (req, res) => {
	const transaction = await TransactionModel.findByPk(req.params.id);
	if (!transaction) return res.status(500).send('server error');
	return res.status(200).json(transaction);
});
