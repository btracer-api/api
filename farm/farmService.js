const Farm = require('./farm')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Farm.methods(['get','post','put'])

Farm.updateOptions({ new : true, runValidators : true})

// Farm.before('get', passport.authenticate('jwt', { session: false}))
//      .before('post', passport.authenticate('jwt', { session: false}))
//      .before('put', passport.authenticate('jwt', { session: false}))
    //  .before('delete', passport.authenticate('jwt', { session: false}))

module.exports = Farm