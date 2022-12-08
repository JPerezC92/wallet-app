import { z } from 'zod';

export const AuthLoginResponse = z.object({
	accessToken: z.string(),
});
