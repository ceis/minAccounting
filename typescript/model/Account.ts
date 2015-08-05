import AccountType from "./AccountType";
import Transaction from "./Transaction";

class Account {
    name:string;
    nr:number;
    type:AccountType;
    symbol:string;
    tags:string[];
    initialAmount:number;
    private nextTxNr:number = 1;

    isAffectedBy(transaction:Transaction):boolean {
        return this.isSourceOf(transaction) || this.isTargetOf(transaction);
    }

    isSourceOf(transaction:Transaction):boolean {
        return transaction.fromAccount === this;
    }

    isTargetOf(transaction:Transaction):boolean {
        return transaction.toAccount === this;
    }

    getOtherAccount(transaction:Transaction):Account {
        return this.isSourceOf(transaction) ? transaction.toAccount : transaction.fromAccount;
    }

    isOfType(accountType:AccountType) {
        return this.type === accountType;
    }

    getNextTxNr():number {
        return this.nextTxNr++;
    }
}

export default Account;
