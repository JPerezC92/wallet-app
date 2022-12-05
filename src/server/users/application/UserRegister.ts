import { UseCase, UuidGenerator } from '@/SharedServer/domain';
import { User, UsersRepository } from '@/UsersServer/domain';

type UserRegisterInput = Pick<
	User,
	'firstName' | 'lastName' | 'email' | 'password'
>;

export const UserRegister: (
	usersRepo: UsersRepository,
	uuidGenerator: UuidGenerator
) => UseCase<Promise<User>, UserRegisterInput> = (
	_usersRepo,
	_uuidGenerator
) => {
	return {
		execute: async ({ email, firstName, lastName, password }) => {
			const userAlreadyRegistered = await _usersRepo.findByEmail(email);

			if (userAlreadyRegistered) {
				throw new Error('User already registered');
			}

			const user = new User(
				_uuidGenerator.generate(),
				firstName,
				lastName,
				email,
				password
			);

			await _usersRepo.register(user);

			return user;
		},
	};
};
