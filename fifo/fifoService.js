const FIFO = require('./fifo')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

FIFO.methods(['get', 'post', 'put', 'delete'])

FIFO.updateOptions({ new: true, runValidators: true })

FIFO.before('get', passport.authenticate('jwt', { session: false }))
     .before('post', passport.authenticate('jwt', { session: false }))
     .before('put', passport.authenticate('jwt', { session: false }))
     .before('delete', passport.authenticate('jwt', { session: false }))

module.exports = FIFO