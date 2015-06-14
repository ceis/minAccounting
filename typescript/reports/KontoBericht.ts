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
        this.accountService.getTransactionsByAccount(this.account).forEach((tx: Transaction) => {
            var date = this.formatDate(tx.date);
            var what = this.account.getOtherAccount(tx).name;
            var amount = tx.amount;
            if (this.account.isSourceOf(tx)) {
                amount = -amount;
            }
            saldo += amount;
            console.log(`${date}: ${this.amountToString(8, amount)} ${this.amountToString(8, saldo)} ${what}`);
        });
    }
}

export default KontoBericht;
