const Boxes = require('./boxes')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Boxes.methods(['get', 'post', 'put'])

Boxes.updateOptions({ new: true, runValidators: true })

// GrainType.before('get', passport.authenticate('jwt', { session: false}))
//      .before('post', passport.authenticate('jwt', { session: false}))
//      .before('put', passport.authenticate('jwt', { session: false}))
//  .before('delete', passport.authenticate('jwt', { session: false}))

module.exports = Boxes