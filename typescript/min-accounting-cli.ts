import AccountService from "./service/AccountService";
import data from '../data2014';

var accountService = new AccountService();
accountService.loadData(data);

accountService.printTransactions(accountService.getAccountByName("Kassa"));

//accountData.sort((a1, a2) => a1.type - a2.type).forEach(a => console.log(JSON.stringify(a)));

