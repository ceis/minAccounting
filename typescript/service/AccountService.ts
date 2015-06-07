import Account from "../model/Account";
import Transaction from "../model/Transaction";

interface TransactionData {
    date: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    tax: number;
    text: string;
}

function zeroPad(num: number): string {
    return (num < 10 ? "0" : "") + num;
}

function amountToString(width: number, amount: number): string {
    var str = String(Math.round(amount / 10) / 100);
    if (amount % 1000 === 0) {
        str += ".00";
    } else if (amount % 100 === 0) {
        str += "0";
    }
    while (str.length < width) {
        str = " " + str;
    }
    return str;
}

function formatDate(date: Date): string {
    var day = zeroPad(date.getDate());
    var month = zeroPad(date.getMonth() + 1);
    var year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function byAccount(account:Account):(tx:Transaction) => boolean {
    return (transaction:Transaction):boolean => {
        return account.isAffectedBy(transaction);
    };
}

class AccountService {

    _accounts:Account[];
    _accountsByName:{ [name: string]: Account; };

    _transactions:Transaction[];

    loadAccounts(accountData:any[]):void {
        this._accounts = [];
        this._accountsByName = {};
        accountData.forEach((accountData:any) => {
            var account = new Account();
            account.name = accountData.name;
            account.type = accountData.type;
            account.initialAmount = (accountData.initialAmount || 0) * 1000;
            account.tags = accountData.tags;
            this._accounts.push(account);
            this._accountsByName[accountData.name] = account;
        });
    }

    loadTransactions(transactionData:any[][]):void {
        this._transactions = [];
        transactionData.forEach((transactionData:any[], i:number) => {
            var transaction = new Transaction();
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
    }

    getAccountByName(name:string):Account {
        return this._accountsByName[name];
    }

    printTransactions(account:Account):void {
        var saldo = account.initialAmount;
        this._transactions.filter(byAccount(account)).forEach((tx: Transaction) => {
            var date = formatDate(tx.date);
            var what = account.getOtherAccount(tx).name;
            var amount = tx.amount;
            if (account.isSourceOf(tx)) {
                amount = -amount;
            }
            saldo += amount;
            console.log(`${date}: ${amountToString(8, amount)} ${amountToString(8, saldo)} ${what}`);
        });
    }
}

export default AccountService;
