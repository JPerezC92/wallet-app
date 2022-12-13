import { Adapter, UseCase } from '@/SharedServer/domain';
import { User, UserNotFound, UsersRepository } from '@/UsersServer/domain';

interface AuthSearchUserInfoProps {
	email: string;
}

/**
 * @throws { UserNotFound }
 */
export const AuthSearchUserInfo: <Result>(
	userRepo: UsersRepository,
	userAdapter: Adapter<User, Result>
) => UseCase<Promise<Result>, AuthSearchUserInfoProps> = (
	_usersRepo,
	userAdapter
) => {
	return {
		execute: async ({ email }) => {
			const user = await _usersRepo.findByEmail(email);

			if (!user) throw new UserNotFound();

			return userAdapter(user);
		},
	};
};
