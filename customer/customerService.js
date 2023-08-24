const Customer = require('./customer')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Customer.methods(['get','post','put'])

Customer.updateOptions({ new : true, runValidators : true})

Customer.before('get', passport.authenticate('jwt', { session: false}))
     .before('post', passport.authenticate('jwt', { session: false}))
     .before('put', passport.authenticate('jwt', { session: false}))

Customer.after("post", transformPostResult);

function transformPostResult (req, res, next) {
     let newID = res.locals.bundle._id;
     let newBundle = { externalUserId: newID }
     res.locals.bundle = newBundle;
     next();
}

module.exports = Customer