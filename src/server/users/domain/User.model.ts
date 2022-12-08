export class User {
	constructor(
		readonly id: string,
		readonly firstName: string,
		readonly lastName: string,
		readonly email: string,
		readonly password: string,
		readonly createdAt: Date,
		readonly updatedAt: Date
	) {}

	public static newUser(
		id: string,
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) {
		const createdAt = new Date();
		const updatedAt = new Date();

		return new User(
			id,
			firstName,
			lastName,
			email,
			password,
			createdAt,
			updatedAt
		);
	}
}
