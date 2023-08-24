const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')

const regionTypeSchema = new mongoose.Schema({
    region: { type:String, required: 'Region is mandatory'},
    city: { type: String, required: 'A city for region is needed!'},
    state: { type: String, required: 'A provincy for region is needed!'},
    accucheckid: { type: String, required: 'A accucheckid for region is needed!'}
},
{
    timestamps:true
})

regionTypeSchema.plugin(mongooseLogs, {
    schemaName: "region",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('rm01', regionTypeSchema)