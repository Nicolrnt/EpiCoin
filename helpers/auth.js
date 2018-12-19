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

function saveValuesToCookie(token, res) {
	// Parse the identity token
	const user = jwt.decode(token.token.id_token);
  
	// Save the access token in a cookie
	res.cookie('graph_access_token', token.token.access_token, {maxAge: 3600000, httpOnly: true});
	// Save the user's name in a cookie
	res.cookie('graph_user_name', user.name, {maxAge: 3600000, httpOnly: true});
  }

async function getTokenFromCode(auth_code) {
    let result = await oauth2.authorizationCode.getToken({
        code: auth_code,
        redirect_uri: oauthConfig.REDIRECT_URI,
        scope: oauthConfig.APP_SCOPES
    });
    const token = oauth2.accessToken.create(result);
    let email =  getEmailFromIdToken(token.token.id_token);
    // console.log("TOKEN", user)

   // getUserInformation(user.preferred_username, token.token.access_token);
   var ret = {
	   token: token,
	   email: email,
   }
   console.log("TEST");
    return ret;
}

exports.getTokenFromCode = getTokenFromCode;
exports.getAuthUrl = getAuthUrl;
exports.saveValuesToCookie = saveValuesToCookie;