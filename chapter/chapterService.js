const Chapter = require('./chapter')
// Auth Middleware with Passport
const passport = require('passport')
require('../config/passport')(passport)

Chapter.methods(['get','post','put'])

Chapter.updateOptions({ new : true, runValidators : true})


module.exports = Chapter