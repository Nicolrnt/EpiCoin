/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : Connected Mirror
** File : app.js
*/

/* Requires */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let parms = { title: 'Home', active: { home: true } };

    console.log("TOTO EN QUAD")
    parms.debug = parms.signInUrl;
    res.render('index', parms);
});

module.exports = router;


// 994823946000000000
// 999998.000