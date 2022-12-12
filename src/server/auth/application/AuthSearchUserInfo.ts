import {
	AuthAccessPayload,
	AuthTokenWasNotProvided,
	TokenCipher,
} from '@/AuthServer/domain';
import { Adapter, UseCase } from '@/SharedServer/domain';
import { User, UserNotFound, UsersRepository } from '@/UsersServer/domain';

interface AuthSearchUserInfoProps {
	accessToken?: string;
}

/**
 * @throws { AuthTokenInvalid }
 * @throws { AuthTokenWasNotProvided }
 * @throws { UserNotFound }
 */
export const AuthSearchUserInfo: <Result>(
	userRepo: UsersRepository,
	tokenEncoder: TokenCipher<AuthAccessPayload>,
	userAdapter: Adapter<User, Result>
) => UseCase<Promise<Result>, AuthSearchUserInfoProps> = (
	_usersRepo,
	_tokenEncoder,
	userAdapter
) => {
	return {
		execute: async ({ accessToken }) => {
			if (!accessToken) throw new AuthTokenWasNotProvided();

			const { email } = _tokenEncoder.decode(accessToken);

			const user = await _usersRepo.findByEmail(email);

			if (!user) throw new UserNotFound();

			return userAdapter(user);
		},
	};
};
