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

async function getTokenFromCode(auth_code) {
    let result = await oauth2.authorizationCode.getToken({
        code: auth_code,
        redirect_uri: oauthConfig.REDIRECT_URI,
        scope: oauthConfig.APP_SCOPES
    });
    const token = oauth2.accessToken.create(result);
    console.log('Token created: ', token.token);
    return token.token.access_token;
}

exports.getTokenFromCode = getTokenFromCode;
exports.getAuthUrl = getAuthUrl;