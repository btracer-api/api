const Vehicle = require('./vehicle')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Vehicle.methods(['get','post','put'])

Vehicle.updateOptions({ new : true, runValidators : true})

Vehicle.before('get', passport.authenticate('jwt', { session: false}))
     .before('post', passport.authenticate('jwt', { session: false}))
     .before('put', passport.authenticate('jwt', { session: false}))

module.exports = Vehicle