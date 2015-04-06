import Account = require("./Account");

export interface Transaction {
	date: Date,
	fromAccount: Account,
	toAccount: Account,
	amount: number,
	tax: number,
	text: string
}
