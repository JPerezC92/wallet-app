import {
	ErrorResponse,
	MyResponse,
} from '@/SharedServer/infrastructure/errors';

export class InternalServerError implements ErrorResponse {
	constructor(
		readonly statusCode: number = 500,
		readonly message: string = 'There was an unknown error',
		readonly code = 'INTERNAL_SERVER_ERROR'
	) {}

	public response(): MyResponse {
		return {
			code: this.code,
			message: this.message,
		};
	}
}
