import AccountService from "./service/AccountService";
import data from '../data2014';
import ImportBericht from "./reports/ImportBericht";
import EinnahmenAusgabenBericht from "./reports/EinnahmenAusgabenBericht2";
import KontoBericht from './reports/KontoBericht';

var accountService = new AccountService();
accountService.loadData(data);

//accountService.printTransactions(accountService.getAccountByName("Kassa"));
//accountData.sort((a1, a2) => a1.type - a2.type).forEach(a => console.log(JSON.stringify(a)));

new ImportBericht("transactions.csv", accountService).print();
//new EinnahmenAusgabenBericht("einnahmen-ausgaben.csv", accountService).print();
//new KontoBericht(accountService, accountService.getAccountByName("Kassa")).print();

