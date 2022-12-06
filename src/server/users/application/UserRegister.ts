import { PasswordEncryptor } from '@/AuthServer/domain/PasswordEncryptor';
import { Adapter, UseCase, UuidGenerator } from '@/SharedServer/domain';
import { User, UsersRepository } from '@/UsersServer/domain';

type UserRegisterInput = Pick<
	User,
	'firstName' | 'lastName' | 'email' | 'password'
>;

class DivideByZero extends Error {}

/**
 * @throws {DivideByZero} Argument x must be non-zero.
 */
export const UserRegister: <AdapterReturn>(
	usersRepo: UsersRepository,
	uuidGenerator: UuidGenerator,
	passwordEncryptor: PasswordEncryptor,
	userAdapter: Adapter<User, AdapterReturn>
) => UseCase<Promise<AdapterReturn>, UserRegisterInput> = (
	_usersRepo,
	_uuidGenerator,
	_passwordEncryptor,
	userAdapter
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
				await _passwordEncryptor.encrypt(password)
			);

			await _usersRepo.register(user);

			return userAdapter(user);
		},
	};
};
