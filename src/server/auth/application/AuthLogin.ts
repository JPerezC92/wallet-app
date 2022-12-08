import {
	AuthAccessPayload,
	PasswordCipher,
	TokenCipher,
} from '@/AuthServer/domain';
import { UseCase } from '@/SharedServer/domain';
import {
	User,
	UserInvalidCredentials,
	UsersRepository,
} from '@/UsersServer/domain';

type AuthLoginProps = Pick<User, 'email' | 'password'>;

export const AuthLogin: (
	passwordCipher: PasswordCipher,
	tokenCipher: TokenCipher<AuthAccessPayload>,
	usersRepo: UsersRepository
) => UseCase<Promise<string>, AuthLoginProps> = (
	passwordCipher,
	tokenCipher,
	_usersRepo
) => {
	return {
		execute: async ({ email, password }) => {
			const user = await _usersRepo.findByEmail(email);

			if (!user) throw new UserInvalidCredentials();

			const passwordsAreEqual = await passwordCipher.compare(
				password,
				user.password
			);

			if (!passwordsAreEqual) throw new UserInvalidCredentials();

			return tokenCipher.encode({ id: user.id, email: user.email });
		},
	};
};
