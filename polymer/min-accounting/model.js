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
        //     "Aktiva",
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
                tags: ["Aktiva", "Praxis"]
            },
            {
                name: "Eigenerlag",
                tags: ["Aktiva", "Praxis"]
            },
            {
                name: "Privatentnahme",
                tags: ["Aktiva", "Praxis"]
            },
            {
                name: "Bankkonto",
                tags: ["Aktiva", "Praxis"]
            },
            {
                name: "Bankkonto (privat)",
                tags: ["Aktiva", "Praxis"]
            },
            {
                name: "Kassa",
                tags: ["Aktiva", "Praxis"]
            },
            {
                name: "Mietkonto",
                tags: ["Aktiva", "Wohnung"]
            },
        ];
        // this.accountTypes.forEach(function(accountType) {
        //     this.accounts[accountType] = [];
        // }, this);
        this.transactions = [];
        // this.commands = [];
        // this.executeCommands([
        // ["addAccount", "Einnahmen", "Kinesiologische Behandlung"],
        // ["addAccount", "Aktiva", "Kassa"],
        // ["addAccount", "Aktiva", "Volksbank"],
        // ["addAccount", "Aktiva", "Volksbank (privat)"]
        // ]);
        this.initTransactions();
        console.log("foo");
    },

    filter: [],

    computed: {
        // selectedAccountCategory: 'accountTypes[selectedAccountCategoryIndex]',
        // selectedAccount: 'accounts[selectedAccountCategory][selectedAccountIndex]'
        selectedTransactions: 'filterTransactions(filter, transactions)'
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
            ["2014-08-20","Mietkonto","Bankkonto","0.0","298.61"],
            ["2014-08-19","SVA","Bankkonto","0.0","26.01"],
            ["2014-08-18","Bankkonto","SVA","0.0","26.01"],
            ["2014-08-04","Mietkonto","Bankkonto","0.0","69.07"],
            ["2014-07-30","Mietkonto","Bankkonto","0.0","298.61"],
            ["2014-07-21","Bankkonto","Steuerberater","0.2","786.00"],
            ["2014-07-21","Eigenerlag","Bankkonto","0.0","500.00"],
            ["2014-07-08","Bankkonto","Steuerberater","0.2","54.00"],
            ["2014-07-08","Bankkonto","Kinesiologiebedarf","0.0","14.20"]
        ].map(function(tx) {
            var fromAccount = this.getAccount(tx[1]);
            var toAccount = this.getAccount(tx[2]);
            return {
                date: tx[0],
                fromAccount: fromAccount,
                toAccount: toAccount,
                tax: 1*tx[3],
                amount: 1*tx[4],
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
