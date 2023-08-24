const Warehouse = require('./warehouse')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Warehouse.methods(['get','post','put'])

Warehouse.updateOptions({ new : true, runValidators : true})

// Warehouse.before('get', passport.authenticate('jwt', { session: false}))
//      .before('post', passport.authenticate('jwt', { session: false}))
//      .before('put', passport.authenticate('jwt', { session: false}))

module.exports = Warehouse