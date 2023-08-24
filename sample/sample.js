const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')

const sampleSchema = new mongoose.Schema({
    parentOrder: { type: String },
    parentOrderVolume: { type: Number },
    lot: { type: String},
    state: { type: String}
},
{
    timestamps:true
})

sampleSchema.plugin(mongooseLogs, {
    schemaName: "sample",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('qm01', sampleSchema)