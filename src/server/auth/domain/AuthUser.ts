import { PasswordCipher } from '@/AuthServer/domain/PasswordCipher';
import { Password } from '@/AuthServer/domain/valueObject';
import { User } from '@/UsersServer/domain';

interface AuthUserProps extends Pick<User, 'email'> {
	password: Password;
}

export class AuthUser implements AuthUserProps {
	email: string;
	password: Password;

	constructor(props: AuthUserProps) {
		this.email = props.email;
		this.password = props.password;
	}

	public comparePassword(
		passwordToCompare: string,
		passwordCipher: PasswordCipher
	) {
		return this.password.equals(passwordToCompare, passwordCipher);
	}
}
