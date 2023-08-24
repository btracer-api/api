const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema;

const stockSchema = new mongoose.Schema({
    warehouse: { type: Schema.Types.ObjectId, ref: 'wh01' },
    warehousename: { type: String },
    movimentDate:{ type : Date, default: Date.now},
    movimentType:{ type: String, required: true, enum:['delivery','return','inbound','outbound']},
    qualityCheck:{ type: Boolean, required: true, default: false},
    document:{ type: String, required: false}, //Nota Fiscal, Romaneio or Delivery Order
    documentDate:{ type : Date, default: Date.now},
    stockQuantity: { type: Number, required: true} // - Amount of Packs
},
{
    timestamps:true
})

stockSchema.plugin(mongooseLogs, {
    schemaName: "stock",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('st01', stockSchema)