const GeoData = require('./geodata')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

GeoData.methods(['get','post','put','delete'])

GeoData.updateOptions({ new : true, runValidators : true})

GeoData.before('get', passport.authenticate('jwt', { session: false}))
     .before('post', passport.authenticate('jwt', { session: false}))
     .before('put', passport.authenticate('jwt', { session: false}))
     .before('delete', passport.authenticate('jwt', { session: false}))

module.exports = GeoData