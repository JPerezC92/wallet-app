import { z } from 'zod';

export const ErrorResponse = z.object({
	code: z.string(),
	message: z.string(),
});

export type ErrorResponse = z.infer<typeof ErrorResponse>;
