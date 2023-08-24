const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema;

const demandSchema = new mongoose.Schema({
    orderno: { type: String, required: 'A demand order is needed!' },
    chapter: { type: String },
    roasttype: { type: String },
    grindtype: { type: String },
    graintype:  { type: String },
    demanddate: { type : Date, default: Date.now},
    goodQuantity: { type: Number, required: true}
},
{
    timestamps:true
})

demandSchema.plugin(mongooseLogs, {
    schemaName: "demand",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('dm01', demandSchema)