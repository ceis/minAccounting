import AccountType from "./AccountType";
import Transaction from "./Transaction";

class Account {
	name: string;
	type: AccountType;
	tags: string[];
	initialAmount: number;

	isAffectedBy(transaction: Transaction): boolean {
		return this.isSourceOf(transaction) || this.isTargetOf(transaction);
	}

	isSourceOf(transaction: Transaction): boolean {
		return transaction.fromAccount === this;
	}

	isTargetOf(transaction: Transaction): boolean {
		return transaction.toAccount === this;
	}

	getOtherAccount(transaction: Transaction): Account {
		return this.isSourceOf(transaction) ? transaction.toAccount : transaction.fromAccount;
	}
}

export default Account;
