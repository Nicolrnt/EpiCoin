const oauthConfig = require('../config/keys').oauthConfig;

const credentials = {
    client: {
        id: oauthConfig.APP_ID,
        secret: oauthConfig.APP_PASSWORD,
    },
    auth: {
        tokenHost: 'https://login.microsoftonline.com',
        authorizePath: 'common/oauth2/v2.0/authorize',
        tokenPath: 'common/oauth2/v2.0/token'
    }
};
const oauth2 = require('simple-oauth2').create(credentials);

function getAuthUrl() {
    const returnVal = oauth2.authorizationCode.authorizeURL({
        redirect_uri: oauthConfig.REDIRECT_URI,
        scope: oauthConfig.APP_SCOPES
    });
    console.log(`Generated auth url: ${returnVal}`);
    return returnVal;
}

function getEmailFromIdToken(id_token) {
    let token_parts = id_token.split('.');

    let encoded_token = new Buffer(token_parts[1].replace('-', '+').replace('_', '/'), 'base64');

    let decoded_token = encoded_token.toString();

    let jwt = JSON.parse(decoded_token);

    console.log("JWT", jwt)
    return jwt.preferred_username
}

function getUserInformation(email, token) {
    const request = require('request');

    request({
        url: 'https://graph.microsoft.com/v1.0/users/' + email,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        rejectUnauthorized: false
    }, function(err, res) {
        if(err) {
        } else {
            console.log(res.body);
        }
    });
}

async function getTokenFromCode(auth_code) {
    let result = await oauth2.authorizationCode.getToken({
        code: auth_code,
        redirect_uri: oauthConfig.REDIRECT_URI,
        scope: oauthConfig.APP_SCOPES
    });
    const token = oauth2.accessToken.create(result);
    let email =  getEmailFromIdToken(token.token.id_token);
    console.log("TOKEN", user)

    const User = require('../models/user-model').User;

    User.findOne({email: email}).exec((err, currentUser) => {
	if (err) return handleError(err);

	if (currentUser) {
		console.log('Current user: ' + currentUser);
		done(null, currentUser);
	} else {
		var user = new User({
			username: email,
			id: token.token.id_token,
			accessToken: token.token.access_token,
			wallet: 0,
			school: "Epitech",
			avatar: "",
            email: email,
		});
		user.save(function (err) {
			if (err) console.log(err);
		});
	}
});
   // getUserInformation(user.preferred_username, token.token.access_token);
    return token.token.access_token;
}

exports.getTokenFromCode = getTokenFromCode;
exports.getAuthUrl = getAuthUrl;