import accountData = require('./data/accounts');
import transactionData = require('./data/transactions');

accountData.sort((a1, a2) => a1.type - a2.type).forEach(a => console.log(JSON.stringify(a)));

