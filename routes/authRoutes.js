const passport = require('passport');

module.exports = (app) => {
    // Routes being exported as an anonymous func
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            //scope identifies what type of access we want from this user: i.e. profile and email
            // google has list of scope items we can look up
            scope: ['profile', 'email']
        })
    );
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google')    
    );
    
    app.get('/api/logout', (req, res) => {
        //passport adds a function to our request called req.logout
        // it takes the cookie with our userId and kills it
        req.logout();
        res.send(req.user);
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}