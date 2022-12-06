import { AuthAccessPayload, TokenEncoder } from '@/AuthServer/domain';
import { Adapter, UseCase } from '@/SharedServer/domain';
import { User, UsersRepository } from '@/UsersServer/domain';

interface AuthSearchUserInfoProps {
	accessToken: string;
}

export const AuthSearchUserInfo: <T>(
	userRepo: UsersRepository,
	tokenEncoder: TokenEncoder<AuthAccessPayload>,
	userAdapter: Adapter<User, T>
) => UseCase<Promise<T>, AuthSearchUserInfoProps> = (
	_usersRepo,
	_tokenEncoder,
	userAdapter
) => {
	return {
		execute: async ({ accessToken }) => {
			const { email } = _tokenEncoder.decode(accessToken);

			const user = await _usersRepo.findByEmail(email);

			if (!user) throw new Error('not founnd');

			return userAdapter(user);
		},
	};
};
