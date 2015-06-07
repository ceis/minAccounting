import Account from "./Account";

class Transaction {
	date: Date;
	fromAccount: Account;
	toAccount: Account;
	amount: number;
	tax: number;
	text: string;
}

export default Transaction;
