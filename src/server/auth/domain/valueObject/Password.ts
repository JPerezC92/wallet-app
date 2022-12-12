import { PasswordCipher } from '@/AuthServer/domain/PasswordCipher';
import { StringValueObject } from '@/SharedServer/domain/valueObjects/StringValueObject';

export class Password extends StringValueObject {
	public equals(
		value: string,
		passwordCipher: PasswordCipher
	): ReturnType<PasswordCipher['compare']> {
		return passwordCipher.compare(value, this.value);
	}
}
