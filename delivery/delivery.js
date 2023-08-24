const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema;

const deliverySchema = new mongoose.Schema({
    develiryOrder: { type: Number, required: true},
    type: { type: String, required: true, enum:['interna','externa']}, // Internal - to attend logistict under warehouses / External - to attend the customer
    status: { type: String, required: true, enum:['pendente','finalizada','cancelada']},
    destination: { type: String, required: true},
    shipTo: { type: String },
    billTo: { type: String },
    deliveryDate: { type : Date, default: Date.now}, // - Order Data - Date expected to be delivered
    shipDate: { type : Date, default: Date.now}, // - Ship Date - Real time delivered
    shipQuantity: { type: Number, required: true}, // - Amount of Packs
    shipWeight: { type: Number },
    ETD:{ type : Date, default: Date.now}, //Estimated Time Delivery
    ETA:{ type : Date, default: Date.now}, //Estimated Time Arrivel 
    ArrivalWolffDate:{ type : Date, default: Date.now}, //Actual Time Arrival  
    // vehicle: { type: Schema.Types.ObjectId, ref: 'vm01',required: 'A vehicle is mandatory to delivery'},
    vehicle: { type: String },
    develiveryAction: { type: String, enum:['inbound','outbound']},
    deliveryItens: [{ type: String}] 
},
{
    timestamps:true
})

deliverySchema.plugin(mongooseLogs, {
    schemaName: "delivery",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('dl01', deliverySchema)