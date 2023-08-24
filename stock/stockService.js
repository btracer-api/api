const Stock = require('./stock')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Stock.methods(['get','post','put','delete'])

Stock.updateOptions({ new : true, runValidators : true})

Stock.before('get', passport.authenticate('jwt', { session: false}))
     .before('post', passport.authenticate('jwt', { session: false}))
     .before('put', passport.authenticate('jwt', { session: false}))
     .before('delete', passport.authenticate('jwt', { session: false}))

module.exports = Stock