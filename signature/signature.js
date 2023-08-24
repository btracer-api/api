const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')

const signatureTypeSchema = new mongoose.Schema({
    email: { type: String, required: 'A eMail for Signature is needed!'},
    dneeded: { type: String, required: 'A date for delivery on Customer is needed!'},
    graintype: { type: String },
    roasttype: { type: String },
    grindtype: { type: String },
    linetype: { type: String },
    quantityVol: { type: Number },
    comments: { type : String },
    usage: { type: Boolean, required: true} 
},
{
    timestamps:true
})

signatureTypeSchema.plugin(mongooseLogs, {
    schemaName: "signature",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('sg01', signatureTypeSchema)