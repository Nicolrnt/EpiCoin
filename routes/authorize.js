var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

/* GET /authorize. */
router.get('/', async function(req, res, next) {
    // Get auth code
    const code = req.query.code;

    // If code is present, use it
    if (code) {
		let info;

        try {
			console.log("AA");
			info = await authHelper.getTokenFromCode(code);
			console.log("BB");
			const User = require('../models/user-model').User;

			User.findOne({email: info.email}).exec((err, currentUser) => {
			if (err) return handleError(err);

			authHelper.saveValuesToCookie(info.token, res);
			if (currentUser) {
				console.log('Current user: ' + currentUser);
				info.avatar = currentUser.avatar;
				// authHelper.saveValuesToCookie(info.token, res);
				// done(null, currentUser);
			} else {
				info.avatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Epitech.png/1200px-Epitech.png";
				var user = new User({
					username: info.username,
					id: info.token.token.id_token,
					accessToken: info.token.token.access_token,
					wallet: 0,
					school: "Epitech",
					avatar: info.avatar,
					email: info.email,
				});
				user.save(function (err) {
					if (err) console.log(err);
				});
				}
				res.render('profile', { title: 'Home', debug: `Access token: ${info.token.token.access_token}`, email: info.email, username: info.username, avatar: info.avatar });
			});
        } catch (error) {
			console.log(error);
            res.render('error', { title: 'Error', message: 'Error exchanging code for token', error: error });
        }
    } else {
        // Otherwise complain
        res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
    }
});

module.exports = router;