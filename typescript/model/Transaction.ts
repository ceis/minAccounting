import Account = require("./Account");

export interface Transaction {
	date: Date;
	fromAccount: Account.Account;
	toAccount: Account.Account;
	amount: number;
	tax: number;
	text: string;
}
