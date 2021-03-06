import Account from "../model/Account";
import AccountType from "../model/AccountType";
import Transaction from "../model/Transaction";

interface TransactionData {
    date: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    tax: number;
    text: string;
    symbol: string;
}

function compareByDate(tx1, tx2) {
    if (tx1.date < tx2.date) {
        return -1;
    }
    if (tx1.date > tx2.date) {
        return 1;
    }
    return tx1.recordNr - tx2.recordNr;
}

function byAccount(account:Account):(tx:Transaction) => boolean {
    return (transaction:Transaction):boolean => {
        return account.isAffectedBy(transaction);
    };
}

function byAccountType(accountType:AccountType):(tx:Transaction) => boolean {
    return (transaction:Transaction):boolean => {
        return transaction.fromAccount.isOfType(accountType) || transaction.toAccount.isOfType(accountType);
    };
}

function isIncome(transaction:Transaction): boolean {
    return transaction.fromAccount.isOfType(AccountType.Income) && !transaction.toAccount.isOfType(AccountType.Income);
}

function isExpense(transaction:Transaction): boolean {
    return transaction.toAccount.isOfType(AccountType.Expense) && !transaction.fromAccount.isOfType(AccountType.Expense);
}

function isLiabilities(transaction:Transaction): boolean {
    return transaction.toAccount.isOfType(AccountType.Liabilities) && !transaction.fromAccount.isOfType(AccountType.Liabilities);
}

class AccountService {

    _accounts:Account[];
    _accountsByName:{ [name: string]: Account; };

    _transactions:Transaction[];

    loadData(data: any): void {
        this.loadAccounts(data.accounts);
        this.loadTransactions(data.transactions);
    }

    loadAccounts(accountData:any[]):void {
        this._accounts = [];
        this._accountsByName = {};
        accountData.forEach((accountData:any) => {
            var account = new Account();
            account.name = accountData.name;
            account.nr = accountData.nr || '????';
            account.type = <AccountType>AccountType[<string>accountData.type];
            account.initialAmount = (accountData.initialAmount || 0) * 1000;
            account.tags = accountData.tags;
            account.symbol = accountData.symbol || '';
            this._accounts.push(account);
            this._accountsByName[accountData.name] = account;
        });
    }

    loadTransactions(transactionData:any[][]):void {
        this._transactions = [];
        var recordNr = 0;
        transactionData.forEach((transactionData:any[], i:number) => {
            var transaction = new Transaction();
            transaction.recordNr = recordNr++;
            transaction.date = new Date(transactionData[0]);

            var fromAccount = this._accountsByName[transactionData[1]];
            if (fromAccount === undefined) {
                console.log(`ERROR: transaction ${i}: unknown account: ${transactionData[1]}`);
            }
            transaction.fromAccount = fromAccount;

            var toAccount = this._accountsByName[transactionData[2]];
            if (toAccount === undefined) {
                console.log(`ERROR: transaction ${i}: unknown account: ${transactionData[2]}`);
            }
            transaction.toAccount = toAccount;

            transaction.tax = transactionData[3];
            transaction.amount = transactionData[4] * 1000;

            this._transactions.push(transaction);
        });
        this._transactions = this._transactions.sort(compareByDate);
        this._transactions.forEach((tx) => {
            tx.fromAccountTxNr = tx.fromAccount.getNextTxNr();
            tx.toAccountTxNr = tx.toAccount.getNextTxNr();
        });
    }

    getAccountByName(name:string):Account {
        return this._accountsByName[name];
    }

    getTransactionsByAccountType(accountType: AccountType) {
        return this._transactions.filter(byAccountType(accountType));
    }

    getTransactionsByAccount(account) {
        return this._transactions.filter(byAccount(account));
    }

    getIncomeTransactions() {
        return this._transactions.filter(isIncome);
    }

    getExpenseTransactions() {
        return this._transactions.filter(isExpense);
    }

    getLiabilitiesTransactions() {
        return this._transactions.filter(isLiabilities);
    }
}

export default AccountService;
