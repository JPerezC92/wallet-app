import { z } from 'zod';

import { AccountEndpoint } from '@/Server/account/infrastructure/schemas';

export const UserEndpoint = z.object({
	id: z.string().min(1),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().min(1),
	updatedAt: z.date(),
	createdAt: z.date(),
	accountList: z.array(AccountEndpoint),
});

export type UserEndpoint = z.infer<typeof UserEndpoint>;
