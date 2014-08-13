/*
[["addAccount", "Kinesiologische Behandlung", "income", 20]]

acc.executeCommand(["addAccount", "Kinesiologiebedarf", "expense", 20])
 */
Polymer('min-accounting', {

    dataStore: null,
    model: null,
    commands: null,

    initialized: false,

    domReady: function() {
        console.log("ready");
        this.dataStore = this.$.dataStore;
        window.model = this.model = this.$.model;
        this.init();
        window.acc = this;
        this.$.file.read();
    },

    init: function(commands) {
        if (this.commands) {
            this.commands.forEach(function(command) {
                this.executeCommand(command);
            }, this);
        }
        this.initialized = true;
    },

    executeCommand: function(command) {
        var name = command[0];
        switch (name) {
            case "addAccount":
            {
                var args = command.slice(1);
                this.model.addAccount.apply(this.model, args);
                break;
            }
        }
        if (this.initialized) {
            this.commands.push(command);
        }
    },

    printData: function() {
        console.log("data: ", this.dataStore.value);
    },

    modelChanged: function(newModel) {
        console.log("new model", newModel);
    },

    handleFileData: function(data) {
        console.log("file: " + data);
    },

    openFile: function() {
        console.log("open file");
        chrome.fileSystem.chooseEntry({

        }, function(entry) {
            console.log("entry", entry);
        });
    }
});
