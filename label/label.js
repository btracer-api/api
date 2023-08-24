const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema

const labelTypeSchema = new mongoose.Schema({
    orderno: { type: String, required: true},
    process: { type: String },
    operation: { type: String },
    production: { type: Schema.Types.ObjectId, ref: 'set01'},
    year: { type: String },
    lastsequence: { type: Number, min: 1 },
    qty: { type: Number },
    type: { type : String, required: 'A type is mandatory', enum:['unique','composed']},
    comments: { type : String },
    usage: { type: Boolean, required: true}
},
{
    timestamps:true
})

labelTypeSchema.plugin(mongooseLogs, {
    schemaName: "label",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('lb01', labelTypeSchema)