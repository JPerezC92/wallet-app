import { z } from 'zod';

export const AccountEndpoint = z.object({
	id: z.string(),
	currency: z.string(),
	money: z.number(),
	userId: z.string(),
});
