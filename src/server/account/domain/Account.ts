interface AccountProps {
	id: string;
	currency: string;
	money: bigint;
	userId: string;
}

export class Account implements Readonly<AccountProps> {
	readonly id: string;
	readonly currency: string;
	readonly money: bigint;
	readonly userId: string;

	constructor(props: AccountProps) {
		this.id = props.id;
		this.currency = props.currency;
		this.money = props.money;
		this.userId = props.userId;
	}
}
