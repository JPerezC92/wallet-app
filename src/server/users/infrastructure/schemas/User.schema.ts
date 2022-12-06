import { z } from 'zod';

export const UserEndpoint = z.object({
	id: z.string().min(1),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().min(1),
	updatedAt: z.date(),
	createdAt: z.date(),
});

export type UserEndpoint = z.infer<typeof UserEndpoint>;
