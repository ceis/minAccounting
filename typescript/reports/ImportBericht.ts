import AccountService from '../service/AccountService';
import Account from '../model/Account';
import AccountType from '../model/AccountType';
import Transaction from '../model/Transaction';
import Report from './Report';

interface Totals {
    amount: number;
    amount_0: number;
    amount_10: number;
    amount_20: number;
    tax: number;
    tax_0: number;
    tax_10: number;
    tax_20: number;
}

class EinnahmenAusgabenBericht extends Report {

    outFile: string;
    accountService:AccountService;

    constructor(outFile: string, accountService:AccountService) {
        super();
        this.outFile = outFile;
        this.accountService = accountService;
    }

    print():void {
        this.start();
        this.println('satzart;konto;gkonto;belegnr;belegdatum;buchsymbol;buchcode;prozent;steuercode;betrag;steuer;text');
        this.printTransactions("Kassa");
        this.printTransactions("Bankkonto");
        this.printTransactions("Bankkonto (privat)");
        this.printTransactions("Mietkonto");
    }

    private printTransactions(accountName: string) {
        let account = this.accountService.getAccountByName(accountName);
        let transactions = this.accountService.getTransactionsByAccount(account);
        transactions.forEach((tx:Transaction) => {
            let otherAccount = account.getOtherAccount(tx);
            let isIncome = otherAccount.isOfType(AccountType.Income);
            let isExpense = otherAccount.isOfType(AccountType.Expense);
            if (isIncome || isExpense) {
                let sign = isIncome ? -1 : 1;
                this.printTransaction(account, otherAccount, tx, isIncome, sign);
            } else {
                // Eine Umbuchung zwischen Assets und/oder Liabilities.
                this.printTransaction(account, otherAccount, tx, true, -1);
                this.printTransaction(otherAccount, account, tx, false, 1);
            }
        });
    }

    private printTransaction(account, otherAccount, tx, isIncome, sign) {
        let satzart = 0;
        let konto = otherAccount.nr;
        let gkonto = account.nr;
        let belegnr = tx.getTxNrForAccount(account);
        let belegdatum = this.formatDate(tx.date);
        let buchsymbol = account.symbol;
        let buchcode = isIncome ? 2 : 1;
        let prozent = tx.tax * 100;
        let steuercode = isIncome ? 1 : 2; // 1 ... UST, 2 ... VOST
        let betrag = this.formatAmount(sign * tx.amount);
        let steuer = this.formatAmount(sign * tx.amount * tx.tax);
        let text = otherAccount.name;

        this.println(`${satzart};${konto};${gkonto};${belegnr};${belegdatum};${buchsymbol};${buchcode};${prozent};${steuercode};${betrag};${steuer};${text}`);
    }
}

export default EinnahmenAusgabenBericht;
