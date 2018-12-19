/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : EpiCoin
** File : balance.js
*/

/* Requires */
const router = require("express").Router();
var authHelper = require('../helpers/auth');


router.get("/", async function(req, res) {
	console.log("TOKASS")

	res.json({authUrl: authHelper.getAuthUrl()});
});

/* Exports */
module.exports = router;
