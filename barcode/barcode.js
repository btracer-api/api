const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema

const barcodeTypeSchema = new mongoose.Schema({
    labelno: { type: Schema.Types.ObjectId, ref: 'lb01' },
    orderno: { type: String },
    qrcode: { type: String },
    labelType: { type: String, enum: ['MASTER', 'PRIMARIA'] },
    zebraPrintData: { type: String },
    printStatus: { type: String, enum: ['NEW', 'DONE'] },
    label_token: { type: String },
    blockchain_hash: { type: String },
    mapping_code: { type: String },
    comments: { type : String }
},
{
    timestamps:true
})

barcodeTypeSchema.plugin(mongooseLogs, {
    schemaName: "barcode",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('lb02', barcodeTypeSchema)