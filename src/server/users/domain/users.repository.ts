import { User } from '@/UsersServer/domain/User.model';

export interface UsersRepository {
	register(user: User): Promise<void>;
	findByEmail(email: User['email']): Promise<User | undefined>;
}
