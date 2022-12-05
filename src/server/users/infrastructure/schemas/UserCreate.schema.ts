import { z } from 'zod';

export const UserCreate = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().min(1),
	password: z.string(),
});

export interface UserCreate extends z.infer<typeof UserCreate> {}
