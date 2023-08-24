const Sample = require('./sample')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Sample.methods(['get','post','put'])

Sample.updateOptions({ new : true, runValidators : true})


module.exports = Sample