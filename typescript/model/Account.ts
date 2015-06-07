import AccountType from "./AccountType";

interface Account {
	name: string;
	type: AccountType;
	tags: string[];
}

export default Account;
