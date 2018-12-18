/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : EpiCoin
** File : balance.js
*/

/* Requires */
const router = require("express").Router();
const ethers = require("ethers");
const credentials = require("../config/keys").credentials;

/* Balance */
const provider = ethers.getDefaultProvider("ropsten");
let walletWithProvider = new ethers.Wallet(credentials.privateKey, provider);

router.get("/", async function(req, res) {
	walletWithProvider.getBalance().then((balance) => {
		console.log("> balance : " + balance);
		res.json({balance: parseInt(balance, 16)});
	})
});

/* Exports */
module.exports = router;
