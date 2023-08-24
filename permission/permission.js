const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema

const permissionSchema = new mongoose.Schema({
    user: { type : Schema.Types.ObjectId, ref: 'usrm01', required: 'A user is needed!'},
    permission: { type: String, required: 'A permission is needed!'},
    description: { type : String },
    usage: { type: Boolean, required: true} 
},
{
    timestamps:true
})

permissionSchema.plugin(mongooseLogs, {
    schemaName: "permission",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('usrm02', permissionSchema)