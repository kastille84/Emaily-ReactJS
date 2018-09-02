const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {
    app.post('/api/stripe', async (req, res) => {
        const charge = await stripe.charges.create({
                    amount: 500,
                    currency: 'usd',
                    description: '$5 for 5 credits',
                    source: req.body.id //*important* this is the token give to use by stripe on frontend
                });
        //this user prop is the same user in our DB, therefore we can call save on it to update our record in Db
        req.user.credits += 5;
        const user = await req.user.save();      
        
        res.send(user);
    });
}