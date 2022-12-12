import { UuidJSGenerator } from '@/SharedServer/infrastructure/services';
import { User } from '@/UsersServer/domain';

export const UserMock = new User({
	id: UuidJSGenerator().generate(),
	firstName: 'Mock User',
	lastName: 'Mock User',
	email: 'example@gmail.com',
	password: '123456',
	createdAt: new Date('12/11/2020'),
	updatedAt: new Date('12/11/2020'),
});
