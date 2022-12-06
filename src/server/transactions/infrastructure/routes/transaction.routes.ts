import { ctx } from '@/src/server/context';
import { transactionsEndpoints } from '@/TransactionsServer/infrastructure/routes/transaction.endpoints';

export const usersRouter = ctx.router(transactionsEndpoints);

usersRouter.get('/transactions', async (_req, res) => {
	_req.headers.authorization; // Bearer dsadasdas;
	// 	const uow = UnitOfWork();
	// const bearerToken = 	 _req.headers.authorization
	// 	uow.transaction(async (db) => {
	// 		return await db.transactionStored.findMany({ where: {userId: _req.body.} });
	// 	});

	// 	if (!transactions)
	// 		return res
	// 			.status(404)
	// 			.json({ error: { message: 'No transactions found', code: 404 } });
	return res.status(200).json([]);
});

// usersRouter.get('/transactions/:id', async (req, res) => {
// 	const transaction = await TransactionModel.findByPk(req.params.id);
// 	if (!transaction) return res.status(500).send('server error');
// 	return res.status(200).json(transaction);
// });
