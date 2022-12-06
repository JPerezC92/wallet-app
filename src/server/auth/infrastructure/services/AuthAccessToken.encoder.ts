import jwt, { JwtPayload } from 'jsonwebtoken';

import { AuthAccessPayload } from '@/AuthServer/domain/AuthAccessPayload';
import { TokenEncoder } from '@/AuthServer/domain/TokenEncoder';
import { parseBearerToken } from '@/AuthServer/utils';
import { EnvVars } from '@/SharedServer/infrastructure/utils/envVars';

export const AuthAccessTokenEncoder: () => TokenEncoder<AuthAccessPayload> =
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
				const tokenParsed = parseBearerToken(token);
				const payload = jwt.verify(
					tokenParsed,
					EnvVars.JWT_ACCESSS_TOKEN_SECRET
				) as JwtPayload & { data: AuthAccessPayload };

				return payload.data;
			},
		};
	};
