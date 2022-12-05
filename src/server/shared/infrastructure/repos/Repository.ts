import { Database } from '@/Server/db/UnitOfWork';

export interface Repository<RepoType> {
	(db: Database): RepoType;
}
