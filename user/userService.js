const User = require('./user')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)


User.methods(['get','post','put']) //'delete' is block due keep integraty, so just lock the users.

User.updateOptions({ new : true, runValidators : true})

User.before('get', passport.authenticate('jwt', { session: false}))
     .before('post', passport.authenticate('jwt', { session: false}))
     .before('put', passport.authenticate('jwt', { session: false}))
    //  .before('delete', passport.authenticate('jwt', { session: false}))


module.exports = User