import { AccountStored } from '@prisma/client';

import { Account } from '@/Server/account/domain/Account';

export function AccountPersistenseToModel(params: AccountStored): Account {
	return new Account({ ...params, currency: params.currencyValue });
}
