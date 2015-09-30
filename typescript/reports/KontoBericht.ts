import AccountService from '../service/AccountService';
import AccountType from '../model/AccountType';
import Account from '../model/Account';
import Transaction from '../model/Transaction';
import Report from './Report';

class KontoBericht extends Report {

    accountService: AccountService;
    account: Account;

    constructor(accountService: AccountService, account: Account) {
        super();
        this.accountService = accountService;
        this.account = account;
    }

    print(): void {
        var saldo = this.account.initialAmount;
        var num = 1;
        console.log(`Datum;Lfd. Nr.;Betrag;Steuersatz;Steuer;Saldo;Kostenstelle`);
        this.accountService.getTransactionsByAccount(this.account).forEach((tx: Transaction) => {
            var date = this.formatDate(tx.date);
            var what = this.account.getOtherAccount(tx).name;
            var amount = tx.amount;
            var tax = tx.tax;
            var taxAmount = tx.getTaxAmount();
            if (this.account.isSourceOf(tx)) {
                amount = -amount;
            }
            saldo += amount;
            console.log(`${date};${num};${this.formatAmount(amount)};${this.formatTax(tax)};${this.formatAmount(taxAmount)};${this.formatAmount(saldo)};${what}`);
            num++;
        });
    }
}

export default KontoBericht;
