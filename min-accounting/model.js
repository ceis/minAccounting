Polymer('min-accounting-model', {

    /**
     * History of all executed commands.
     */
     commands: null,

     accountTypes: null,

    /**
     * List of accounts.
     */
     accounts: null,

     selectedAccountCategoryIndex: 0,
     selectedAccountIndex: 0,

    /**
     * List of transactions.
     */
     transactions: null,

     selectedPage: 0,

     selectedSubPage: 0,
     
     searchString: "",

     ready: function() {
        // this.accountTypes = [
        //     "Haben",
        //     "Passiva",
        //     "Einnahmen",
        //     "Ausgaben"
        // ];
        this.pages = [
            {
                name: "Buchungen"
            },
            {
                name: "Konten",
                children: [
                    "Kassa",
                    "Bankkonto"
                ]
            },
            {
                name: "UST Voranmeldung"
            }
        ];
        this.accounts = [
            {
                name: "Kinesiologische Behandlung",
                tags: ["Einnahmen", "Praxis"]
            },
            {
                name: "Bürobedarf",
                tags: ["Ausgaben", "Praxis"]
            },
            {
                name: "Kinesiologiebedarf",
                tags: ["Ausgaben", "Praxis"]
            },
            {
                name: "Steuerberater",
                tags: ["Ausgaben", "Praxis"]
            },
            {
                name: "SVA",
                tags: ["Ausgaben", "Praxis"]
            },
            {
                name: "Bankspesen",
                tags: ["Ausgaben", "Praxis"]
            },
            {
                name: "Privatentnahme",
                tags: ["Haben", "Praxis"]
            },
            {
                name: "Eigenerlag",
                tags: ["Haben", "Praxis"]
            },
            {
                name: "Privatentnahme",
                tags: ["Haben", "Praxis"]
            },
            {
                name: "Bankkonto",
                tags: ["Haben", "Praxis"]
            },
            {
                name: "Bankkonto (privat)",
                tags: ["Haben", "Praxis"]
            },
            {
                name: "Kassa",
                tags: ["Haben", "Praxis"]
            },
            {
                name: "Mietkonto",
                tags: ["Haben", "Wohnung"]
            },
            {
                name: "Miete",
                tags: ["Einnahmen", "Wohnung"]
            },
            {
                name: "Verwaltungskosten",
                tags: ["Einnahmen", "Wohnung"]
            },
            {
                name: "Betriebskosten",
                tags: ["Einnahmen", "Wohnung"]
            },
            {
                name: "Reparaturrücklage",
                tags: ["Einnahmen", "Wohnung"]
            },
            {
                name: "Verwaltungskosten (Ausgabe)",
                tags: ["Ausgaben", "Wohnung"]
            },
            {
                name: "Betriebskosten (Ausgabe)",
                tags: ["Ausgaben", "Wohnung"]
            },
            {
                name: "Reparaturrücklage (Ausgabe)",
                tags: ["Ausgaben", "Wohnung"]
            }
        ];
        // this.accountTypes.forEach(function(accountType) {
        //     this.accounts[accountType] = [];
        // }, this);
        this.transactions = [];
        // this.commands = [];
        // this.executeCommands([
        // ["addAccount", "Einnahmen", "Kinesiologische Behandlung"],
        // ["addAccount", "Haben", "Kassa"],
        // ["addAccount", "Haben", "Volksbank"],
        // ["addAccount", "Haben", "Volksbank (privat)"]
        // ]);
        this.initTransactions();
        console.log("foo");
    },

    filter: [],

    computed: {
        // selectedAccountCategory: 'accountTypes[selectedAccountCategoryIndex]',
        // selectedAccount: 'accounts[selectedAccountCategory][selectedAccountIndex]'
        selectedTransactions: 'filterTransactions(filter, transactions)',
        total_ust: 'calculateTotalUst(selectedTransactions)',
        total_vost: 'calculateTotalVost(selectedTransactions)',
        total_tax: 'total_vost - total_ust',
        total_income_0: 'calculateTotalIncome_0(selectedTransactions)',
        total_income_10: 'calculateTotalIncome_10(selectedTransactions)',
        total_income_20: 'calculateTotalIncome_20(selectedTransactions)',
        total_income: 'total_income_0 + total_income_10 + total_income_20',
        total_expense_0: 'calculateTotalExpense_0(selectedTransactions)',
        total_expense_10: 'calculateTotalExpense_10(selectedTransactions)',
        total_expense_20: 'calculateTotalExpense_20(selectedTransactions)',
        total_expense: 'total_expense_0 + total_expense_10 + total_expense_20',
        total_total: 'total_income - total_expense'
    },

    calculateTotalUst: function(transactions) {
        return transactions.reduce(function(total, tx) {
            return total + tx.ust;
        }, 0);
    },

    calculateTotalVost: function(transactions) {
        return transactions.reduce(function(total, tx) {
            return total + tx.vost;
        }, 0);
    },

    calculateTotalIncome_0: function(transactions) {
        return this.calculateTotalIncome(0, transactions);
    },

    calculateTotalIncome_10: function(transactions) {
        return this.calculateTotalIncome(0.1, transactions);
    },

    calculateTotalIncome_20: function(transactions) {
        return this.calculateTotalIncome(0.2, transactions);
    },

    calculateTotalIncome: function(tax, transactions) {
        return transactions.reduce(function(total, tx) {
            if (tx.type === "+" && tx.tax === tax) {
                return total + tx.netto;
            }
            return total;
        }, 0);
    },

    calculateTotalExpense_0: function(transactions) {
        return this.calculateTotalExpense(0, transactions);
    },

    calculateTotalExpense_10: function(transactions) {
        return this.calculateTotalExpense(0.1, transactions);
    },

    calculateTotalExpense_20: function(transactions) {
        return this.calculateTotalExpense(0.2, transactions);
    },

    calculateTotalExpense: function(tax, transactions) {
        return transactions.reduce(function(total, tx) {
            if (tx.type === "-" && tx.tax === tax) {
                return total + tx.netto;
            }
            return total;
        }, 0);
    },

    filterTransactions: function(filter, transactions) {
        if (transactions) {
            if (filter) {
                return transactions.filter(function(tx) {
                    console.log("filter", filter, tx);
                    if (filter.length === 0) {
                        return true;
                    }
                    return filter.reduce(function(prev, str) {
                        return prev && (tx.searchString.indexOf(str) > -1);
                    }, true);
                });
            }
            return transactions;
        }
        return [];
    },

    executeCommands: function(commands) {
        commands.forEach(function(command) {
            this.executeCommand(command);
        }, this);
    },

    executeCommand: function(command) {
        this.commands.push(command);
        var fn = this["_" + command[0]];
        var args = command.slice(1);
        fn.apply(this, args);
    },

    _addAccount: function(type, name) {
        var category = this.accounts[type];
        if (!category) {
            throw new Error("Invalid account type: " + type);
        }
        category.push(name);
    },

    addAccount: function(type, name) {
        this.executeCommand(["addAccount", type, name]);
        console.log("accounts:", this.accounts);
    },

    getAccount: function(name) {
        var result;
        this.accounts.some(function(account) {
            if (account.name === name) {
                result = account;
                return true;
            }
        });
        if (!result) {
            throw new Error("Unknown account " + name);
        }
        return result;
    },

    getAccountTransactions: function(name) {

    },

    fireChange: function() {
        this.fire("change", {
            accounts: this.accounts,
            transactions: this.transactions
        });
    },

    search: function() {
        console.log("search", this.searchString);
        this.filter = this.searchString.toLowerCase().split(" ");
    },

    getTxType: function(fromAccount, toAccount) {
        if (fromAccount.tags.indexOf("Einnahmen") > -1) {
            if (toAccount.tags.indexOf("Haben") > -1) {
                return "+";
            } else {
                return "ERROR";
            }
        } else if (fromAccount.tags.indexOf("Haben") > -1) {
            if (toAccount.tags.indexOf("Ausgaben") > -1) {
                return "-";
            } else if (toAccount.tags.indexOf("Haben") > -1) {
                return "~";
            } else {
                return "ERROR";
            }
        } else if (fromAccount.tags.indexOf("Ausgaben") > -1) {
            if (toAccount.tags.indexOf("Haben") > -1) {
                // z.B. für Rückbuchungen der SVA.
                return "+";
            } else {
                return "ERROR";
            }
        } else {
            return "ERROR";
        }
    },

    initTransactions: function() {
        this.transactions = [
            ["2014-07-03","Kassa","Privatentnahme","0.0","4000.00"],
            ["2014-07-03","Kinesiologische Behandlung","Kassa","0.2","80.00"],
            ["2014-07-03","Kinesiologische Behandlung","Kassa","0.2","80.00"],
            ["2014-07-07","Kinesiologische Behandlung","Kassa","0.2","50.00"],
            ["2014-07-09","Kinesiologische Behandlung","Kassa","0.2","50.00"],
            ["2014-07-17","Kinesiologische Behandlung","Kassa","0.2","80.00"],
            ["2014-07-17","Kinesiologische Behandlung","Kassa","0.2","80.00"],
            ["2014-07-17","Kinesiologische Behandlung","Kassa","0.2","80.00"],
            ["2014-07-21","Kinesiologische Behandlung","Kassa","0.2","80.00"],
            ["2014-07-23","Kassa","Bürobedarf","0.2","13.40"],
            ["2014-08-05","Kinesiologische Behandlung","Kassa","0.2","80.00"],
            ["2014-08-05","Kinesiologische Behandlung","Kassa","0.2","50.00"],
            ["2014-08-05","Kinesiologische Behandlung","Kassa","0.2","80.00"],
            ["2014-08-12","Kinesiologische Behandlung","Kassa","0.2","50.00"],
            ["2014-09-02","Kinesiologische Behandlung","Kassa","0.2","80.00"],
            ["2014-09-02","Kinesiologische Behandlung","Kassa","0.2","50.00"],
            ["2014-09-16","Kinesiologische Behandlung","Kassa","0.2","80.00"],
            ["2014-09-23","Kinesiologische Behandlung","Kassa","0.2","80.00"],
            ["2014-09-30","Kinesiologische Behandlung","Kassa","0.2","80.00"],
            ["2014-09-30","Kinesiologische Behandlung","Kassa","0.2","50.00"],
            ["2014-09-30","Kinesiologische Behandlung","Kassa","0.2","50.00"],
            ["2014-09-30","Bankkonto","Bankspesen","0.0","8.99"],
            ["2014-09-30","Kassa","Privatentnahme","0.0","1500.00"],
            ["2014-08-20","Mietkonto","Bankkonto","0.0","298.61"],
            ["2014-08-19","SVA","Bankkonto","0.0","26.01"],
            ["2014-08-18","Bankkonto","SVA","0.0","26.01"],
            ["2014-08-04","Mietkonto","Bankkonto","0.0","69.07"],
            ["2014-07-30","Mietkonto","Bankkonto","0.0","298.61"],
            ["2014-07-21","Bankkonto","Steuerberater","0.2","786.00"],
            ["2014-07-21","Eigenerlag","Bankkonto","0.0","500.00"],
            ["2014-07-08","Bankkonto","Steuerberater","0.2","54.00"],
            ["2014-07-08","Bankkonto","Kinesiologiebedarf","0.0","14.20"],
            ["2014-07-14","Miete","Mietkonto","0.1","311.63"],
            ["2014-07-14","Betriebskosten","Mietkonto","0.1","88.88"],
            ["2014-07-14","Verwaltungskosten","Mietkonto","0.1","13.26"],
            ["2014-07-14","Reparaturrücklage","Mietkonto","0","7.60"],
            ["2014-07-14","Mietkonto","Betriebskosten (Ausgabe)","0.1","88.88"],
            ["2014-07-14","Mietkonto","Verwaltungskosten (Ausgabe)","0.1","26.28"],
            ["2014-07-14","Mietkonto","Reparaturrücklage (Ausgabe)","0","7.60"],
            ["2014-08-14","Miete","Mietkonto","0.1","311.63"],
            ["2014-08-14","Betriebskosten","Mietkonto","0.1","88.88"],
            ["2014-08-14","Verwaltungskosten","Mietkonto","0.1","13.26"],
            ["2014-08-14","Reparaturrücklage","Mietkonto","0","7.60"],
            ["2014-08-14","Mietkonto","Betriebskosten (Ausgabe)","0.1","88.88"],
            ["2014-08-14","Mietkonto","Verwaltungskosten (Ausgabe)","0.1","26.28"],
            ["2014-08-14","Mietkonto","Reparaturrücklage (Ausgabe)","0","7.60"],
            ["2014-09-14","Miete","Mietkonto","0.1","311.63"],
            ["2014-09-14","Betriebskosten","Mietkonto","0.1","126.38"],
            ["2014-09-14","Verwaltungskosten","Mietkonto","0.1","16.78"],
            ["2014-09-14","Reparaturrücklage","Mietkonto","0","7.60"],
            ["2014-09-14","Mietkonto","Betriebskosten (Ausgabe)","0.1","88.88"],
            ["2014-09-14","Mietkonto","Verwaltungskosten (Ausgabe)","0.1","26.28"],
            ["2014-09-14","Mietkonto","Reparaturrücklage (Ausgabe)","0","7.60"]
        ].map(function(tx) {
            var date = tx[0];
            var fromAccount = this.getAccount(tx[1]);
            var toAccount = this.getAccount(tx[2]);
            var type = this.getTxType(fromAccount, toAccount);
            var tax = 1*tx[3];
            var brutto = 1*tx[4];
            var netto = brutto / (1 + tax);
            var ust = 0;
            var vost = 0;
            if (type === "+") {
                ust = netto * tax;
            } else if (type === "-") {
                vost = netto * tax;
            }
            return {
                date: date,
                fromAccount: fromAccount,
                toAccount: toAccount,
                type: type,
                tax: tax,
                brutto: brutto,
                netto: netto,
                ust: ust,
                vost: vost,
                searchString: (fromAccount.name + " " + toAccount.name).toLowerCase()
            }
        }, this).sort(function(tx1, tx2) {
            if (tx1.date < tx2.date) {
                return -1;
            }
            if (tx1.date > tx2.date) {
                return 1;
            }
            return 1;
        });
    }
});
