import {
	AuthAccessPayload,
	AuthTokenWasNotProvided,
	TokenCipher,
} from '@/AuthServer/domain';
import { UseCase } from '@/SharedServer/domain';

interface AuthSearchUserInfoProps {
	accessToken?: string;
}

/**
 * @throws { AuthTokenInvalid }
 * @throws { AuthTokenWasNotProvided }
 */
export const AuthAccessTokenValidate: (
	tokenEncoder: TokenCipher<AuthAccessPayload>
) => UseCase<AuthAccessPayload, AuthSearchUserInfoProps> = (_tokenEncoder) => {
	return {
		execute: ({ accessToken }) => {
			if (!accessToken) throw new AuthTokenWasNotProvided();

			return _tokenEncoder.decode(accessToken);
		},
	};
};
