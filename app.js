/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : Connected Mirror
** File : app.js
*/

/* Requires */
const express = require("express");
const path = require("path");
const ethers = require("ethers");
const credentials = require("./config/keys").credentials;

/* Require routes */

/* Create app */
const app = express();
const port = 8080;

/* Set up view engine */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/* Use routes */

/* Home */
let wallet = new ethers.Wallet(credentials.privateKey);

// Connect a wallet to mainnet
let provider = ethers.getDefaultProvider("ropsten");
let walletWithProvider = new ethers.Wallet(credentials.privateKey, provider);
walletWithProvider.getBalance().then((balance) => {
	console.log("> balance : " + balance);
})

app.get("/", function(req, res) {
	res.render("index");
});

/* Listen */
app.listen(port, function() {
	console.log("$> app listen on port " + port);
});

/* Exports */
module.exports = app