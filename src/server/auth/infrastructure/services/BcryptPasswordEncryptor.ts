import Bcrypt from 'bcrypt';

import { PasswordEncryptor } from '@/AuthServer/domain';

export const BcryptPasswordEncryptor: () => PasswordEncryptor = () => {
	const rounds = 10;

	return {
		encrypt: async (plainPassword) => {
			const salt = await Bcrypt.genSalt(rounds);
			return await Bcrypt.hash(plainPassword, salt);
		},

		compare: async (plainPassword, hashedPassword) => {
			return await Bcrypt.compare(plainPassword, hashedPassword);
		},
	};
};
