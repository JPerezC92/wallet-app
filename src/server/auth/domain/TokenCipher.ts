export interface TokenCipher<T> {
	encode(payload: T): string;
	decode(token: string): T;
}
