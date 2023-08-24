const Region = require('./region')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Region.methods(['get','post','put'])

Region.updateOptions({ new : true, runValidators : true})


module.exports = Region