import { User } from '@/UsersServer/domain';

export const UsersMockRepository = () => ({
	findByEmail: jest.fn<Promise<User | undefined>, [User['email']]>(),
	register: jest
		.fn<Promise<void>, [User]>()
		.mockImplementation((_user) => Promise.resolve()),
});
