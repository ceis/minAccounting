import Account from "./Account";

class Transaction {
    date:Date;
    fromAccount:Account;
    toAccount:Account;
    amount:number;
    tax:number;
    text:string;
    fromAccountTxNr:number;
    toAccountTxNr:number;

    getAmountNetto():number {
        return Math.round(this.amount / (1 + this.tax));
    }

    getTaxAmount():number {
        return Math.round(this.getAmountNetto() * this.tax);
    }

    getTxNrForAccount(account:Account):number {
        return account == this.fromAccount ? this.fromAccountTxNr : this.toAccountTxNr;
    }
}

export default Transaction;
