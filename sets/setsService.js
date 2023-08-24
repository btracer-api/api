const Sets = require('./sets')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Sets.methods(['get','post','put'])

Sets.updateOptions({ new : true, runValidators : true})

Sets.before('get', passport.authenticate('jwt', { session: false}))
     .before('post', passport.authenticate('jwt', { session: false}))
     .before('put', passport.authenticate('jwt', { session: false}))

module.exports = Sets