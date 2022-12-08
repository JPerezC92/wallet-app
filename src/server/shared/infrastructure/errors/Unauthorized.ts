import { StatusCodes } from 'http-status-codes';

import {
	ErrorResponse,
	MyResponse,
} from '@/SharedServer/infrastructure/errors/ResponseError';

export class Unauthorized implements ErrorResponse {
	readonly statusCode = StatusCodes.UNAUTHORIZED;

	constructor(readonly code: string, readonly message: string) {}

	public response(): MyResponse {
		return { code: this.code, message: this.message };
	}
}
