import { z } from 'zod';

export const NotFound = z.object({
	error: z.object({
		code: z.number(),
		message: z.string(),
	}),
});
