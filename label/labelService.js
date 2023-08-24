const Label = require('./label')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Label.methods(['get','post','put', 'delete'])

Label.updateOptions({ new : true, runValidators : true})

// Label.before('get', passport.authenticate('jwt', { session: false}))
//      .before('post', passport.authenticate('jwt', { session: false}))
//      .before('put', passport.authenticate('jwt', { session: false}))
//      .before('delete', passport.authenticate('jwt', { session: false}))

module.exports = Label