/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : Connected Mirror
** File : app.js
*/

/* Requires */
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render("index", { title: "Express" });
});

module.exports = router;

// 994823946000000000
// 999998.000