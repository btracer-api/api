const mongoose = require('mongoose')
const connstring = 'mongodb+srv://gutemberg:1010245877@cluster0.xbcexzv.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = global.Promise
mongoose.connect(connstring, {
    useNewUrlParser: true
})
// Mongo 
mongoose.connection.on('connected', () => {
    return console.log('Mongoose Connected')
})

mongoose.connection.on('disconnected', () => {
    return console.log('Mongoose Disconnected')
})

mongoose.connection.on('error', error => {
    return console.log('Mongoose connection error: ' + error)
})

module.exports = mongoose