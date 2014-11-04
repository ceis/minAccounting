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

     ready: function() {
        this.accountTypes = [
            "Aktiva",
            "Passiva",
            "Einnahmen",
            "Ausgaben"
        ];
        this.accounts = {};
        this.accountTypes.forEach(function(accountType) {
            this.accounts[accountType] = [];
        }, this);
        this.transactions = [];
        this.commands = [];
        this.executeCommands([
        ["addAccount", "Einnahmen", "Kinesiologische Behandlung"],
        ["addAccount", "Aktiva", "Kassa"],
        ["addAccount", "Aktiva", "Volksbank"],
        ["addAccount", "Aktiva", "Volksbank (privat)"]
        ]);
    },

    computed: {
        selectedAccountCategory: 'accountTypes[selectedAccountCategoryIndex]',
        selectedAccount: 'accounts[selectedAccountCategory][selectedAccountIndex]'
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

    getAccountTransactions: function(name) {

    },

    fireChange: function() {
        this.fire("change", {
            accounts: this.accounts,
            transactions: this.transactions
        });
    }
});
