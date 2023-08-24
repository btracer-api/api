const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema

const farmSchema = new mongoose.Schema({
    farmkey: { type: String, required: 'A key is mandatory'},
    name: { type: String, required: 'A farm name is needed!'},
    region: { type : String, required: 'A region is needed!'},
    city: { type : String, required: 'A city is needed!'},
    description: { type : String },
    usage: { type: Boolean, required: true},
    keyuser:  { type: Schema.Types.ObjectId, ref: 'usrm01' },
    geodata: { type: String, required: false}, 
    certificates: { type: String, required: false} 
},
{
    timestamps:true
})

farmSchema.plugin(mongooseLogs, {
    schemaName: "farm",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('fm01', farmSchema)