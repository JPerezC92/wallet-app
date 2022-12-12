import { UserMock } from '@/__TESTS__/server/users/domain/UserMock';
import { UsersMockRepository } from '@/__TESTS__/server/users/infrastructure';
import { AuthLogin } from '@/AuthServer/application';
import {
	AuthAccessTokenCipher,
	BcryptPasswordCipher,
} from '@/AuthServer/infrastructure/services';
import { UserInvalidCredentials } from '@/UsersServer/domain';

describe('Testing AuthLogin use case', () => {
	test('should return a token string', async () => {
		const usersRepository = UsersMockRepository();
		usersRepository.findByEmail.mockResolvedValue(UserMock);

		const passwordCipher = BcryptPasswordCipher();
		passwordCipher.compare = jest.fn().mockResolvedValue(true);

		const accessToken = await AuthLogin(
			passwordCipher,
			AuthAccessTokenCipher(),
			usersRepository
		).execute({ email: UserMock.email, password: UserMock.password });

		expect(accessToken).toEqual(expect.any(String));
	});

	test('should throw an UserInvalidCredentials error when the user doesnt exist', async () => {
		const usersRepository = UsersMockRepository();
		usersRepository.findByEmail.mockResolvedValue(undefined);

		const passwordCipher = BcryptPasswordCipher();
		passwordCipher.compare = jest.fn().mockResolvedValue(true);

		try {
			await AuthLogin(
				BcryptPasswordCipher(),
				AuthAccessTokenCipher(),
				usersRepository
			).execute({ email: UserMock.email, password: UserMock.password });
		} catch (error) {
			expect(error).toBeInstanceOf(UserInvalidCredentials);
		}
	});

	test('should throw an UserInvalidCredentials error when the password doesnt match', async () => {
		const usersRepository = UsersMockRepository();
		usersRepository.findByEmail.mockResolvedValue(UserMock);

		const passwordCipher = BcryptPasswordCipher();
		passwordCipher.compare = jest.fn().mockResolvedValue(false);

		try {
			await AuthLogin(
				BcryptPasswordCipher(),
				AuthAccessTokenCipher(),
				usersRepository
			).execute({ email: UserMock.email, password: UserMock.password });
		} catch (error) {
			expect(error).toBeInstanceOf(UserInvalidCredentials);
		}
	});
});
