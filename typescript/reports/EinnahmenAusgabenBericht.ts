import AccountService from '../service/AccountService';
import AccountType from '../model/AccountType';
import Transaction from '../model/Transaction';
import Report from './Report';

class EinnahmenAusgabenBericht extends Report {

    accountService:AccountService;

    constructor(accountService:AccountService) {
        super();
        this.accountService = accountService;
    }

    print():void {
        console.log('Konto;Lfd. Nr.;Datum;Netto;Steuersatz;UST;Kostenstelle');
        var total = 0;
        var total_0 = 0;
        var total_10 = 0;
        var total_20 = 0;
        var total_ust = 0;
        var total_ust_0 = 0;
        var total_ust_10 = 0;
        var total_ust_20 = 0;
        var counter = 0;
        var incomeTransactions = this.accountService.getTransactionsByAccountType(AccountType.Income);
        incomeTransactions.forEach((tx:Transaction) => {
            var date = this.formatDate(tx.date);
            ++counter;
            // Einnahmen gehen immer von einem Einnahmenkonto auf ein Habenkonto.
            var account = tx.toAccount.name;
            var what = tx.fromAccount.name;
            var netto = tx.getAmountNetto();
            var ust = tx.getTaxAmount();
            total += netto;
            total_ust += ust;
            if (tx.tax === 0) {
                total_0 += netto;
                total_ust_0 += ust;
            } else if (tx.tax === 0.1) {
                total_10 += netto;
                total_ust_10 += ust;
            } else if (tx.tax === 0.2) {
                total_20 += netto;
                total_ust_20 += ust;
            } else {
                throw new Error(`Invalid tax: ${tx.tax}.`)
            }
            console.log(`${account};${counter};${date};${this.amountToString(0, netto)};${this.amountToString(0, ust)};${what}`);
        });
        console.log(`;0%;;${this.amountToString(0, total_0)};;${this.amountToString(0, total_ust_0)}`);
        console.log(`;10%;;${this.amountToString(0, total_10)};;${this.amountToString(0, total_ust_10)}`);
        console.log(`;20%;;${this.amountToString(0, total_20)};;${this.amountToString(0, total_ust_20)}`);
        console.log(`Gesamt;;;${this.amountToString(0, total)};;${this.amountToString(0, total_ust)}`);
    }
}

export default EinnahmenAusgabenBericht;
