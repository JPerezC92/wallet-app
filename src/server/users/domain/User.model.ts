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
}
