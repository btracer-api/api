const Segretation = require('./segregation')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Segretation.methods(['get', 'post', 'put', 'delete'])

Segretation.updateOptions({ new: true, runValidators: true })

Segretation.before('get', passport.authenticate('jwt', { session: false }))
     .before('post', passport.authenticate('jwt', { session: false }))
     .before('put', passport.authenticate('jwt', { session: false }))
     .before('delete', passport.authenticate('jwt', { session: false }))

module.exports = Segretation