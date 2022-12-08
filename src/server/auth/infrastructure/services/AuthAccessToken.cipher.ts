import jwt, { JwtPayload } from 'jsonwebtoken';

import {
	AuthAccessPayload,
	AuthTokenInvalid,
	TokenCipher,
} from '@/AuthServer/domain';
import { parseBearerToken } from '@/AuthServer/utils';
import { EnvVars } from '@/SharedServer/infrastructure/utils/envVars';

export const AuthAccessTokenCipher: () => TokenCipher<AuthAccessPayload> =
	() => {
		return {
			encode: (payload) => {
				const token = jwt.sign(
					{ data: payload },
					EnvVars.JWT_ACCESSS_TOKEN_SECRET,
					{ expiresIn: '1h' }
				);

				return token;
			},

			decode: (token) => {
				try {
					const tokenParsed = parseBearerToken(token);
					const payload = jwt.verify(
						tokenParsed,
						EnvVars.JWT_ACCESSS_TOKEN_SECRET
					) as JwtPayload & { data: AuthAccessPayload };

					return payload.data;
				} catch (error) {
					throw new AuthTokenInvalid();
				}
			},
		};
	};
