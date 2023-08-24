const Permission = require('./permission')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Permission.methods(['get','post','put','delete'])

Permission.updateOptions({ new : true, runValidators : true})

Permission.before('get', passport.authenticate('jwt', { session: false}))
     .before('post', passport.authenticate('jwt', { session: false}))
     .before('put', passport.authenticate('jwt', { session: false}))
     .before('delete', passport.authenticate('jwt', { session: false}))

module.exports = Permission