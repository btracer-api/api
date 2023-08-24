const Packing = require('./packing')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Packing.methods(['get', 'post', 'put', 'delete'])

Packing.updateOptions({ new: true, runValidators: true })

Packing.before('get', passport.authenticate('jwt', { session: false }))
     .before('post', passport.authenticate('jwt', { session: false }))
     .before('put', passport.authenticate('jwt', { session: false }))
     .before('delete', passport.authenticate('jwt', { session: false }))

module.exports = Packing