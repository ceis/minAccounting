enum AccountType {Income, Expense, Assets, Liabilities};

interface Account {
	name: string,
	type: AccountType,
	tags: string[]
}

Account.Type = AccountType;

export Account;
