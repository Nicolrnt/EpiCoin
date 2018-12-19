/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : EpiCoin
** File : balance.js
*/

/* Requires */
const router = require("express").Router();
const ethers = require("ethers");
const credentials = require("../config/keys").credentials;
var authHelper = require('../helpers/auth');

// const User = require('../models/user-model').User;

// User.findOne({id: profile.id}).exec((err, currentUser) => {
// 	if (err) return handleError(err);

// 	if (currentUser) {
// 		console.log('Current user: ' + currentUser);
// 		done(null, currentUser);
// 	} else {
// 		var user = new User({
// 			username: "",
// 			id: "",
// 			accessToken: "",
// 			wallet: 0,
// 			school: "",
// 			avatar: "",
// 		});
// 		user.save(function (err) {
// 			if (err) console.log(err);
// 		});
// 	}
// });

/* Balance */
const provider = ethers.getDefaultProvider("ropsten");
let walletWithProvider = new ethers.Wallet(credentials.privateKey, provider);

router.get("/", async function(req, res) {
	walletWithProvider.getBalance().then((balance) => {
		balance = 0x3f7fab9d;
		const str = parseInt(balance.toString(), 16);
		console.log("> balance : " + balance);
		console.log("> str : " + str);
		res.json({balance: str});
        authHelper.getAuthUrl();

        res.json({balance: balance});
	});
});

/* Exports */
module.exports = router;
