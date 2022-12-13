import { UserMock } from '@/__TESTS__/server/users/domain/UserMock';
import { UsersMockRepository } from '@/__TESTS__/server/users/infrastructure';
import { AuthSearchUserInfo } from '@/AuthServer/application';
import { UserNotFound } from '@/UsersServer/domain';
import { UserModelToEndpoint } from '@/UsersServer/infrastructure/adapters';

describe('Testing AuthSearchUserInfo use case', () => {
	test('should return the user information', async () => {
		// const tokenCipher = AuthAccessTokenCipher();
		// tokenCipher.decode = jest
		// 	.fn()
		// 	.mockReturnValue({ email: UserMock.email, password: UserMock.password });

		const usersRepository = UsersMockRepository();
		usersRepository.findByEmail.mockResolvedValue(UserMock);

		const userInfo = await AuthSearchUserInfo(
			usersRepository,
			UserModelToEndpoint
		).execute({ email: 'email@test.com' });

		expect(userInfo).toBeDefined();
	});

	test('should return an UserNotFound error', async () => {
		const usersRepository = UsersMockRepository();
		usersRepository.findByEmail.mockResolvedValue(undefined);

		try {
			await AuthSearchUserInfo(
				UsersMockRepository(),
				UserModelToEndpoint
			).execute({ email: 'email@test.com' });
		} catch (error) {
			expect(error).toBeInstanceOf(UserNotFound);
		}
	});
});
