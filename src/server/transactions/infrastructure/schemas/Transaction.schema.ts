import { z } from 'zod';

export const TransactionSchema = z.object({
	id: z.number(),
	amount: z.number().min(1),
	date: z.date().min(new Date('2022-12-01'), { message: 'Error' }),
	description: z.string().min(1),
	userId: z.string().min(1).uuid(),
});
export type Transaction = z.infer<typeof TransactionSchema>;
