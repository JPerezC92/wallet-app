import { Account } from '@/Server/account/domain';

interface UserProps {
	readonly id: string;
	readonly firstName: string;
	readonly lastName: string;
	readonly email: string;
	readonly password: string;
	readonly accountList: Account[];
	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export class User implements UserProps {
	readonly id: string;
	readonly firstName: string;
	readonly lastName: string;
	readonly email: string;
	readonly password: string;
	readonly accountList: Account[];
	readonly createdAt: Date;
	readonly updatedAt: Date;

	constructor(props: UserProps) {
		this.id = props.id;
		this.firstName = props.firstName;
		this.lastName = props.lastName;
		this.email = props.email;
		this.password = props.password;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
		this.accountList = props.accountList;
	}

	public static newUser(
		props: Omit<UserProps, 'createdAt' | 'updatedAt' | 'accountList'>
	) {
		const createdAt = new Date();
		const updatedAt = new Date();

		return new User({
			id: props.id,
			firstName: props.firstName,
			lastName: props.lastName,
			email: props.email,
			password: props.password,
			createdAt,
			updatedAt,
			accountList: [],
		});
	}
}
