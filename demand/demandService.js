const Demand = require('./demand')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Demand.methods(['get','post','put','delete'])

Demand.updateOptions({ new : true, runValidators : true})

Demand.before('get', passport.authenticate('jwt', { session: false}))
     .before('post', passport.authenticate('jwt', { session: false}))
     .before('put', passport.authenticate('jwt', { session: false}))
     .before('delete', passport.authenticate('jwt', { session: false}))

module.exports = Demand