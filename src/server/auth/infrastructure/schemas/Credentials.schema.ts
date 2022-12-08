import { z } from 'zod';

export const Credentials = z.object({
	email: z.string(),
	password: z.string(),
});

export type Credentials = z.infer<typeof Credentials>;
