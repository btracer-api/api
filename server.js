require('dotenv-safe').config({ allowEmptyValues: true })
const port = process.env.PORT || 8080
//const portssl = process.env.PORT || 4983

const bodyParser = require('body-parser'),
  express = require('express'),
  https = require('https'),
  http = require('http'),
  fs = require('fs'),
  logger = require('morgan'),
  helmet = require('helmet'),
  cors = require('cors'),
  passport = require('passport'),
  axios = require('axios'),
  AccessControl = require('express-ip-access-control');

const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(logger('dev'))
server.use(helmet())
server.use(cors())
server.use(passport.initialize())

const ads = [
  { title: 'Please, Refer to DriveOn Block Chain security manager!' }
]

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 's1ngle'
}

// const setWhiteListOptions = {
//     mode: 'allow',
//     denys: [],
//     allows: ['191.189.0.243/24','::1/24','10.69.85.146/24'],
//     forceConnectionAddress: false,
//     log: function(clientIp, access) {
//         console.log(clientIp + (access ? ' acessado.' : ' negado.'));
//     },

//     statusCode: 401,
//     redirectTo: '',
//     message: 'Não autorizado'
// };

// server.use(AccessControl(setWhiteListOptions))

server.get('/', (req, res) => {
  res.send(ads)
})


http.createServer(server).listen(port)
//https.createServer(options, server).listen(portssl)

module.exports = server