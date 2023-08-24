const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: 'First Name is needed!'},
    lastName: { type : String, required: 'Last Name is needed!'},
    email: { type : String, required: 'eMail is mandatory!', unique: true, lowercase: true, trim: true, match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/},
    password: { type : String, required: 'A password is needed!'},
    permissionLevel: { type: Number, min: 0, require: true },
    status: { type: String, required: 'status is mandatory', enum:['new','locked','released']} //Status ['new','locked','released'] new: new user and without authorizatons, locked: user locked by admin, released: user with completed profile or unlocked.
},
{
    timestamps:true
})

userSchema.plugin(mongooseLogs, {
    schemaName: "user",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 })

userSchema.pre('save', function (next) {
    let user = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash
                user.permissionLevel = 1                
                next()
            })
        })
    } else {
        return next()
    }
})

userSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    })
 }

module.exports = restful.model('usrm01', userSchema)