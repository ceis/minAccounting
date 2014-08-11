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

    /**
     * List of transactions.
     */
     transactions: null,

     ready: function() {
        this.accountTypes = [
            "assets",
            "liabilities",
            "income",
            "expense"
        ];
        this.accounts = {};
        this.accountTypes.forEach(function(accountType) {
            this.accounts[accountType] = [];
        }, this);
        this.transactions = [];
        this.commands = [];
        this.executeCommands([
        ["addAccount", "income", "Kinesiologische Behandlung"],
        ["addAccount", "assets", "Kassa"],
        ["addAccount", "assets", "Volksbank"],
        ["addAccount", "assets", "Volksbank (privat)"]
        ]);
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

    fireChange: function() {
        this.fire("change", {
            accounts: this.accounts,
            transactions: this.transactions
        });
    }
});
