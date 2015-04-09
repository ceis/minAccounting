import AccountType = require("./AccountType");

export interface Account {
	name: string;
	type: AccountType;
	tags: string[];
}
