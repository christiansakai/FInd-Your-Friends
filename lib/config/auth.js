var facebookId = process.env.FACEBOOK_ID;
var facebookSecret = process.env.FACEBOOK_SECRET;

console.log(facebookId, facebookSecret);



module.exports = {
    'facebookAuth' : {
        'clientID'      : facebookId, // your App ID
        'clientSecret'  : facebookSecret, // your App Secret
        'callbackURL'   : 'http://findyourfriends.herokuapp.com/auth/facebook/callback/'
    }

};
