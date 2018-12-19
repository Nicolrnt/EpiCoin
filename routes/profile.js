/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : EpiCoin
** File : profile.js
*/

/* Requires */
const router = require("express").Router();

/* Profile */
router.get("/", function(req, res) {
	res.render("profile");
});

/* Exports */
module.exports = router;
