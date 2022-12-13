import { AuthAccessTokenValidate } from '@/AuthServer/application';
import {
	AuthAccessPayload,
	AuthTokenInvalid,
	AuthTokenWasNotProvided,
} from '@/AuthServer/domain';
import { AuthAccessTokenCipher } from '@/AuthServer/infrastructure/services';

describe('Test on AuthTokenValidate use case', () => {
	test('should return the AuthAccessPayload', () => {
		const _payload: AuthAccessPayload = { id: '01', email: 'test@gmail.com' };

		const authAccessTokenCipher = AuthAccessTokenCipher();
		authAccessTokenCipher.decode = jest.fn().mockReturnValue(_payload);

		const payload = AuthAccessTokenValidate(authAccessTokenCipher).execute({
			accessToken: 'TOKEN',
		});

		expect(payload).toEqual(_payload);
	});

	test('should return an AuthTokenWasNotProvided error', () => {
		try {
			AuthAccessTokenValidate(AuthAccessTokenCipher()).execute({
				accessToken: undefined,
			});
		} catch (error) {
			expect(error).toBeInstanceOf(AuthTokenWasNotProvided);
		}
	});

	test('should return an AuthTokenInvalid error', () => {
		try {
			AuthAccessTokenValidate(AuthAccessTokenCipher()).execute({
				accessToken: 'invalid_token',
			});
		} catch (error) {
			expect(error).toBeInstanceOf(AuthTokenInvalid);
		}
	});
});
