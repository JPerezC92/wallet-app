import { UserMock } from '@/__TESTS__/server/users/domain/UserMock';
import { UsersMockRepository } from '@/__TESTS__/server/users/infrastructure';
import { AuthSearchUserInfo } from '@/AuthServer/application';
import { AuthTokenInvalid } from '@/AuthServer/domain';
import { AuthAccessTokenCipher } from '@/AuthServer/infrastructure/services';
import { UserModelToEndpoint } from '@/UsersServer/infrastructure/adapters';

describe('Testing AuthSearchUserInfo use case', () => {
	test('should return the user information', async () => {
		const tokenCipher = AuthAccessTokenCipher();
		tokenCipher.decode = jest
			.fn()
			.mockReturnValue({ email: UserMock.email, password: UserMock.password });

		const usersRepository = UsersMockRepository();
		usersRepository.findByEmail.mockResolvedValue(UserMock);

		const userInfo = await AuthSearchUserInfo(
			usersRepository,
			tokenCipher,
			UserModelToEndpoint
		).execute({ accessToken: 'mi token' });

		expect(userInfo).toBeDefined();
	});

	test('should return an AuthTokenInvalid error', async () => {
		try {
			await AuthSearchUserInfo(
				UsersMockRepository(),
				AuthAccessTokenCipher(),
				UserModelToEndpoint
			).execute({ accessToken: 'mi token' });
		} catch (error) {
			expect(error).toBeInstanceOf(AuthTokenInvalid);
		}
	});
});
