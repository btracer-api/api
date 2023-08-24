const Production = require('./production')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Production.methods(['get','post','put','delete'])

Production.updateOptions({ new : true, runValidators : true})

// Production.before('get', passport.authenticate('jwt', { session: false}))
//      .before('post', passport.authenticate('jwt', { session: false}))
//      .before('put', passport.authenticate('jwt', { session: false}))
//      .before('delete', passport.authenticate('jwt', { session: false}))

module.exports = Production