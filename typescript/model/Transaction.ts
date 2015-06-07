import Account from "./Account";

interface Transaction {
	date: Date;
	fromAccount: Account;
	toAccount: Account;
	amount: number;
	tax: number;
	text: string;
}

export default Transaction;
