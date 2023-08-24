const Barcode = require('./barcode')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Barcode.methods(['get','post','put', 'delete'])

Barcode.updateOptions({ new : true, runValidators : true})

Barcode.before('get', passport.authenticate('jwt', { session: false}))
     .before('post', passport.authenticate('jwt', { session: false}))
     .before('put', passport.authenticate('jwt', { session: false}))
     .before('delete', passport.authenticate('jwt', { session: false}))

module.exports = Barcode