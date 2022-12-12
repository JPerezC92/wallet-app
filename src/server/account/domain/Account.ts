interface AccountProps {
	currency: string;
	money: bigint;
	userId: string;
}

export class Account implements Readonly<AccountProps> {
	readonly currency: string;
	readonly money: bigint;
	readonly userId: string;

	constructor(props: AccountProps) {
		this.currency = props.currency;
		this.money = props.money;
		this.userId = props.userId;
	}
}
