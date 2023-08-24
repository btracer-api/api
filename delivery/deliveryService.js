const Delivery = require('./delivery')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Delivery.methods(['get','post','put','delete'])

Delivery.updateOptions({ new : true, runValidators : true})

Delivery.before('get', passport.authenticate('jwt', { session: false}))
     .before('post', passport.authenticate('jwt', { session: false}))
     .before('put', passport.authenticate('jwt', { session: false}))
     .before('delete', passport.authenticate('jwt', { session: false}))

module.exports = Delivery