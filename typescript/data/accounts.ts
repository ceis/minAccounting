import account = require("../model/Account");
import AccountType = require("../model/AccountType");

var accounts:account.Account[] = [{
    name: "Kinesiologische Behandlung",
    type: AccountType.Income,
    tags: ["Praxis"]
}, {
    name: "Bürobedarf",
    type: AccountType.Expense,
    tags: ["Praxis"]
}, {
    name: "Kinesiologiebedarf",
    type: AccountType.Expense,
    tags: ["Praxis"]
}, {
    name: "Steuerberater",
    type: AccountType.Expense,
    tags: ["Praxis"]
}, {
    name: "SVA",
    type: AccountType.Expense,
    tags: ["Praxis"]
}, {
    name: "WK-Umlage",
    type: AccountType.Expense,
    tags: ["Praxis"]
}, {
    name: "Bankspesen",
    type: AccountType.Expense,
    tags: ["Praxis"]
}, {
    name: "Weiterbildung",
    type: AccountType.Expense,
    tags: ["Praxis"]
}, {
    name: "Kreditrückzahlung",
    type: AccountType.Expense,
    tags: ["Praxis"]
}, {
    name: "Ausstattung",
    type: AccountType.Expense,
    tags: ["Praxis"]
}, {
    name: "Büromaterial",
    type: AccountType.Expense,
    tags: ["Praxis"]
}, {
    name: "Werbekosten",
    type: AccountType.Expense,
    tags: ["Praxis"]
}, {
    name: "Privatentnahme",
    type: AccountType.Assets,
    tags: ["Praxis"]
}, {
    name: "Eigenerlag",
    type: AccountType.Assets,
    tags: ["Praxis"]
}, {
    name: "Privatentnahme",
    type: AccountType.Assets,
    tags: ["Praxis"]
}, {
    name: "Bankkonto",
    type: AccountType.Assets,
    tags: ["Praxis"]
}, {
    name: "Kreditkonto",
    type: AccountType.Assets,
    tags: ["Praxis"]
}, {
    name: "Bankkonto (privat)",
    type: AccountType.Assets,
    tags: ["Praxis"]
}, {
    name: "Kassa",
    type: AccountType.Assets,
    tags: ["Praxis"]
}, {
    name: "Mietkonto",
    type: AccountType.Assets,
    tags: ["Wohnung"]
}, {
    name: "Miete",
    type: AccountType.Income,
    tags: ["Wohnung"]
}, {
    name: "Verwaltungskosten",
    type: AccountType.Income,
    tags: ["Wohnung"]
}, {
    name: "Betriebskosten",
    type: AccountType.Income,
    tags: ["Wohnung"]
}, {
    name: "Reparaturrücklage",
    type: AccountType.Income,
    tags: ["Wohnung"]
}, {
    name: "Verwaltungskosten (Ausgabe)",
    type: AccountType.Expense,
    tags: ["Wohnung"]
}, {
    name: "Betriebskosten (Ausgabe)",
    type: AccountType.Expense,
    tags: ["Wohnung"]
}, {
    name: "Reparaturrücklage (Ausgabe)",
    type: AccountType.Expense,
    tags: ["Wohnung"]
}, {
    name: "Reparatur",
    type: AccountType.Expense,
    tags: ["Wohnung"]
}];

export = accounts;
