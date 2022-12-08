import { Prisma, PrismaClient } from '@prisma/client';

export interface Database extends Prisma.TransactionClient {}

export function UnitOfWork() {
	const prisma = new PrismaClient();
	let db: Database;

	return {
		transaction: async <Output>(
			fn: (db: Database) => Promise<Output>
		): Promise<Output> => {
			try {
				const result = prisma.$transaction(async (tx) => {
					db = tx;
					return await fn(db);
				});

				return result;
			} catch (error) {
				console.error(error);
				await prisma.$disconnect();

				process.exit(1);
			} finally {
				await prisma.$disconnect();
			}
		},
	};
}
