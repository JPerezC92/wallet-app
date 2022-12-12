export abstract class StringValueObject {
	constructor(readonly value: string) {}

	public toString(): string {
		return this.value;
	}
}
