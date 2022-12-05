import { z } from 'zod';

export const User = z.object({
	id: z.string().min(1),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().min(1),
	points: z.number(),
	roleId: z.number().min(1),
	updatedAt: z.string(),
	createdAt: z.string(),
});

export type User = z.infer<typeof User>;
