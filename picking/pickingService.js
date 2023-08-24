const Picking = require('./picking')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Picking.methods(['get', 'post', 'put', 'delete'])

Picking.updateOptions({ new: true, runValidators: true })

Picking.before('get', passport.authenticate('jwt', { session: false }))
     .before('post', passport.authenticate('jwt', { session: false }))
     .before('put', passport.authenticate('jwt', { session: false }))
     .before('delete', passport.authenticate('jwt', { session: false }))

module.exports = Picking