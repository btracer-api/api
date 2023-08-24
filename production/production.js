const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema;

const productionSchema = new mongoose.Schema({
    orderno: {type: String, required: 'A production order is needed!' },
    farm: { type: Schema.Types.ObjectId, ref: 'fm01'},
    graintype: { type: Schema.Types.ObjectId, ref: 'gvm01'},
    keyuser:  { type: Schema.Types.ObjectId, ref: 'usrm01' },
    harvestDate: { type : Date, default: Date.now},
    farmer: { type : Schema.Types.ObjectId, ref: 'usrm01', required: 'A farmer is needed!'},
    altitudeData: { type : String },
    goodQuantity: { type: Number, required: true}
},
{
    timestamps:true
})

productionSchema.plugin(mongooseLogs, {
    schemaName: "production",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('fp01', productionSchema)