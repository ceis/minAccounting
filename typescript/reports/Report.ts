/// <reference path="../definitions/node.d.ts" />

import fs = require("fs");

//
//var stream = fs.createWriteStream("my_file.txt");
//stream.once('open', function(fd) {
//    stream.write("My first row\n");
//    stream.write("My second row\n");
//    stream.end();
//});

class Report {

    outFile: string;

    zeroPad(num:number):string {
        return (num < 10 ? "0" : "") + num;
    }

    amountToString(width:number, amount:number):string {
        var str = String(Math.round(amount / 10) / 100);
        var parts = str.split(".");
        var p1 = parts[0];
        if (parts.length > 1) {
            var p2 = parts[1];
            if (amount % 100 === 0) {
                p2 += "0";
            }
        } else {
            p2 = "00";
        }
        str = p1 + "," + p2;
        while (str.length < width) {
            str = " " + str;
        }
        return str;
    }

    formatAmount(amount:number): string {
        return this.amountToString(0, amount);
    }

    formatTax(tax:number):string {
        if (tax === 0) {
            return '0';
        } else if (tax === 0.1) {
            return "0,1";
        } else if (tax === 0.2) {
            return "0,2";
        }
    }

    formatDate(date:Date):string {
        var day = this.zeroPad(date.getDate());
        var month = this.zeroPad(date.getMonth() + 1);
        var year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    start(): void {
        if (fs.existsSync(this.outFile)) {
            fs.truncateSync(this.outFile);
        }
    }

    println(text:string = "") {
        fs.appendFileSync(this.outFile, text + "\n");
        //console.log(text);
    }
}

export default Report;
