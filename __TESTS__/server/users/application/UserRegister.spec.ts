import { UsersMockRepository } from '@/__TESTS__/server/users/infrastructure';
import { BcryptPasswordCipher } from '@/AuthServer/infrastructure/services';
import { UuidJSGenerator } from '@/SharedServer/infrastructure/services';
import { UserRegister } from '@/UsersServer/application';
import { User, UserAlreadyRegistered } from '@/UsersServer/domain';
import { UserModelToEndpoint } from '@/UsersServer/infrastructure/adapters';

const userCreate = {
	firstName: 'userFirstNameTest',
	lastName: 'userLastNameTest',
	email: 'example@gmail.com',
	password: '123456',
};

describe('Testing UserRegister use case', () => {
	test('should create a new user', async () => {
		const userRepository = UsersMockRepository();
		userRepository.findByEmail.mockResolvedValueOnce(undefined);

		try {
			const user = await UserRegister(
				userRepository,
				UuidJSGenerator(),
				BcryptPasswordCipher(),
				UserModelToEndpoint
			).execute(userCreate);

			return expect(user).toBeInstanceOf(User);
		} catch (error) {}
	});

	test('should throw an UserAlreadyRegistered error', async () => {
		const userRepository = UsersMockRepository();
		userRepository.findByEmail.mockResolvedValueOnce({} as User);

		try {
			await UserRegister(
				userRepository,
				UuidJSGenerator(),
				BcryptPasswordCipher(),
				UserModelToEndpoint
			).execute(userCreate);
		} catch (error) {
			expect(error).toBeInstanceOf(UserAlreadyRegistered);
		}
	});
});
