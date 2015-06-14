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
        var totalsIncome = this.printIncome('Einnahmen', 'UST', this.accountService.getIncomeTransactions(), tx => tx.toAccount);
        this.println();
        var totalsExpense = this.printIncome('Ausgaben', 'VOST', this.accountService.getExpenseTransactions(), tx => tx.fromAccount);
        this.println();
        this.println('Gesamt');
        this.println(';Steuersatz;Summe;VOST/UST');
        this.println(`Einnahmen;0%;${this.formatAmount(totalsIncome.amount_0)};${this.formatAmount(totalsIncome.tax_0)};UST`);
        this.println(`;10%;${this.formatAmount(totalsIncome.amount_10)};${this.formatAmount(totalsIncome.tax_10)};UST`);
        this.println(`;20%;${this.formatAmount(totalsIncome.amount_20)};${this.formatAmount(totalsIncome.tax_20)};UST`);
        this.println(`Ausgaben;0%;${this.formatAmount(-totalsExpense.amount_0)};${this.formatAmount(-totalsExpense.tax_0)};VOST`);
        this.println(`;10%;${this.formatAmount(-totalsExpense.amount_10)};${this.formatAmount(-totalsExpense.tax_10)};VOST`);
        this.println(`;20%;${this.formatAmount(-totalsExpense.amount_20)};${this.formatAmount(-totalsExpense.tax_20)};VOST`);
        this.println(`Summe;;${this.formatAmount(totalsIncome.amount - totalsExpense.amount)};${this.formatAmount(totalsIncome.tax - totalsExpense.tax)};Steuerschuld`)
    }

    private printIncome(title: string, taxLabel:string, transactions: Transaction[], getAccount: (transaction:Transaction) => Account): Totals {
        var total = 0;
        var total_0 = 0;
        var total_10 = 0;
        var total_20 = 0;
        var total_ust = 0;
        var total_ust_0 = 0;
        var total_ust_10 = 0;
        var total_ust_20 = 0;
        var counter = 0;
        var incomeTransactions = transactions;
        var totalOtherAccounts = {};
        incomeTransactions.forEach((tx:Transaction) => {
            var otherAccount = getAccount(tx).getOtherAccount(tx).name;
            totalOtherAccounts[otherAccount] = 0;
        });
        var otherAccounts = [];
        for (var a in totalOtherAccounts) {
            if (totalOtherAccounts.hasOwnProperty(a)) {
                otherAccounts.push(a);
            }
        }
        this.println(title);
        this.println('Konto;Datum;Netto;Steuersatz;' + taxLabel + ';Kostenstelle;' + otherAccounts.join(';'));
        incomeTransactions.forEach((tx:Transaction) => {
            var date = this.formatDate(tx.date);
            ++counter;
            // Einnahmen gehen immer von einem Einnahmenkonto auf ein Habenkonto.
            var acc = getAccount(tx);
            var account = acc.name;
            var otherAccount = acc.getOtherAccount(tx).name;
            var netto = tx.getAmountNetto();
            var tax = tx.tax;
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

            var otherAccountsOutput = "";
            otherAccounts.forEach((a:string) => {
                otherAccountsOutput += ";";
                if (otherAccount === a) {
                    otherAccountsOutput += this.formatAmount(netto);
                }
            });
            totalOtherAccounts[otherAccount] += netto;

            this.println(`${account};${date};${this.formatAmount(netto)};${this.formatTax(tax)};${this.formatAmount(ust)};${otherAccount}${otherAccountsOutput}`);
        });

        var totalOtherAccountsOutput = "";
        otherAccounts.forEach((a:string) => {
            totalOtherAccountsOutput += ";" + this.formatAmount(totalOtherAccounts[a]);
        });

        this.println(`Summe;;${this.formatAmount(total)};;${this.formatAmount(total_ust)};${totalOtherAccountsOutput}`);
        this.println(`;0%;${this.formatAmount(total_0)};;${this.formatAmount(total_ust_0)}`);
        this.println(`;10%;${this.formatAmount(total_10)};;${this.formatAmount(total_ust_10)}`);
        this.println(`;20%;${this.formatAmount(total_20)};;${this.formatAmount(total_ust_20)}`);
        
        return {
            amount: total,
            amount_0: total_0,
            amount_10: total_10,
            amount_20: total_20,
            tax: total_ust,
            tax_0: total_ust_0,
            tax_10: total_ust_10,
            tax_20: total_ust_20
        };
    }
}

export default EinnahmenAusgabenBericht;
