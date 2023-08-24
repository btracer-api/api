const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')

const grainTypeSchema = new mongoose.Schema({
    graintypekey: { type: String, required: 'A key for grain type is needed!'},
    name: { type: String, required: 'A name for grain type is needed!'},
    graintype: { type : String, required: 'Gran Type is mandatory'},
    description: { type : String },
    usage: { type: Boolean, required: true} 
},
{
    timestamps:true
})

grainTypeSchema.plugin(mongooseLogs, {
    schemaName: "grain type",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('gvm01', grainTypeSchema)