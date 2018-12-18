/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : Connected Mirror
** File : app.js
*/

/* Requires */
const express = require("express");
const path = require("path");

/* Require routes */
const balance = require("./routes/balance");

/* Create app */
const app = express();
const port = 8080;

/* Set up view engine */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/* Use routes */
app.use("/api/balance", balance);

/* Home */
app.get("/", function(req, res) {
	res.render("index");
});

/* Listen */
app.listen(port, function() {
	console.log("$> app listen on port " + port);
});

/* Exports */
module.exports = app