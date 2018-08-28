// keys.js -- figure out what set of credentials to return 
    // heroku automatically sets NODE_ENV to production for us
    // we us it to check our current environment status
if (process.env.NODE_ENV === 'production') {
    // WE ARE IN PRODUCTION, return prod set of keys
    module.exports = require('./prod');
} else {
    //we are in dev, return the dev keys
    module.exports = require('./dev');
}