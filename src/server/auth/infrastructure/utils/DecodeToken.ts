import { AuthAccessTokenValidate } from '@/AuthServer/application';
import { AuthAccessTokenCipher } from '@/AuthServer/infrastructure/services';

/**
 * @throws { AuthTokenInvalid }
 * @throws { AuthTokenWasNotProvided }
 */
export const DecodeToken = (accessToken?: string) =>
	AuthAccessTokenValidate(AuthAccessTokenCipher()).execute({
		accessToken,
	});
