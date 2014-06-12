var facebookId = process.env.FACEBOOK_ID;
var facebookSecret = process.env.FACEBOOK_SECRET;

console.log(facebookId, facebookSecret);



module.exports = {
    'facebookAuth' : {
        'clientID'      : facebookId, // your App ID
        'clientSecret'  : facebookSecret, // your App Secret
        'callbackURL'   : 'http://192.168.1.26:9000/auth/facebook/callback/'
    }

};
