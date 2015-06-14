class Report {
    zeroPad(num:number):string {
        return (num < 10 ? "0" : "") + num;
    }

    amountToString(width:number, amount:number):string {
        var str = String(Math.round(amount / 10) / 100);
        if (amount % 1000 === 0) {
            str += ".00";
        } else if (amount % 100 === 0) {
            str += "0";
        }
        while (str.length < width) {
            str = " " + str;
        }
        return str;
    }

    formatDate(date:Date):string {
        var day = this.zeroPad(date.getDate());
        var month = this.zeroPad(date.getMonth() + 1);
        var year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
}

export default Report;
