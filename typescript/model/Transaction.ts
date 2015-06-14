import Account from "./Account";

class Transaction {
	date: Date;
	fromAccount: Account;
	toAccount: Account;
	amount: number;
	tax: number;
	text: string;

	getAmountNetto(): number {
		return Math.round(this.amount / (1 + this.tax));
	}

	getTaxAmount(): number {
		return Math.round(this.getAmountNetto() * this.tax);
	}
}

export default Transaction;
