import AccountService from "./service/AccountService";
import accountData from './data/accounts';
import transactionData from './data/transactions';

var accountService = new AccountService();
accountService.loadAccounts(accountData);
accountService.loadTransactions(transactionData);

accountService.printTransactions(accountService.getAccountByName("Kassa"));

//accountData.sort((a1, a2) => a1.type - a2.type).forEach(a => console.log(JSON.stringify(a)));

