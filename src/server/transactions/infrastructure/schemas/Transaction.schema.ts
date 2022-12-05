import { z } from 'zod';

export const TransactionSchema = z.object({
	id: z.number(),
	amount: z.number().min(1),
	date: z.string().min(1),
	description: z.string().min(1),
});

export type Transaction = z.infer<typeof TransactionSchema>;
