let JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt

//Model User
const User = require('../user/user')

module.exports = function(passport) {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = process.env.SECRET
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id, status : { "$ne":  'locked'}}, function(err, user) {
              if (err) {                  
                  return done(err, false)              }
              if (user) {               
                  done(null, user)
              } else {               
                  done(null, false)
              }
          })
      }))
}
