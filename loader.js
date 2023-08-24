const server = require('./server')
require('./config/database')
require('./config/routes')(server)
