const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')

const chapterSchema = new mongoose.Schema({
    chapter: { type:String, required: 'Capitulo é mandatório'},
    description: { type: String }
},
{
    timestamps:true
})

chapterSchema.plugin(mongooseLogs, {
    schemaName: "chapter",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('ch01', chapterSchema)