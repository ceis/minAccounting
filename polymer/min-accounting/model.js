Polymer('min-accounting-model', {

    /**
     * History of all executed commands.
     */
    commands: null,

    /**
     * List of accounts.
     */
    accounts: null,

    /**
     * List of transactions.
     */
    transactions: null,

    ready: function() {
        this.commands = [];
        this.accounts = [];
        this.transactions = [];
    },

    addAccount: function(name, type, tax) {
        this.accounts.push({
            name: name,
            type: type,
            tax: tax
        });
        if (this.initialized) {
            this.commands.push(["addAccount", name, type, tax]);
        }
        console.log("accounts:", this.accounts);
    },

    fireChange: function() {
        this.fire("change", {
            accounts: this.accounts,
            transactions: this.transactions
        });
    }
});
