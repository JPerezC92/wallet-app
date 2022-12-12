import { PasswordCipher } from '@/AuthServer/domain';
import { Adapter, UseCase, UuidGenerator } from '@/SharedServer/domain';
import {
	User,
	UserAlreadyRegistered,
	UsersRepository,
} from '@/UsersServer/domain';

type UserRegisterInput = Pick<
	User,
	'firstName' | 'lastName' | 'email' | 'password'
>;

/**
 * @throws { UserAlreadyRegistered }.
 */
export const UserRegister: <AdapterReturn>(
	usersRepo: UsersRepository,
	uuidGenerator: UuidGenerator,
	passwordEncryptor: PasswordCipher,
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

			if (userAlreadyRegistered) throw new UserAlreadyRegistered();

			const user = User.newUser({
				id: _uuidGenerator.generate(),
				firstName,
				lastName,
				email,
				password: await _passwordEncryptor.encrypt(password),
			});

			await _usersRepo.register(user);

			return userAdapter(user);
		},
	};
};
