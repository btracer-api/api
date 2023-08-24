const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')

const warehouseTypeSchema = new mongoose.Schema({
    whkey: { type:String, required: 'A Warehouse key is needed'},
    name: { type: String, required: 'A name for warehouse is needed!'},
    adrress1: { type: String, required: 'A adrress1 for warehouse is needed!'},
    adrress2: { type: String, required: 'A adrress2 for warehouse is needed!'},
    city: { type: String, required: 'A city for warehouse is needed!'},
    state: { type: String, required: 'A state for warehouse is needed!'},
    type: { type : String, required: 'A type is mandatory', enum:['WH','DC']}, //WH - Warehouse / DC - Distribution Center
    description: { type : String },
    usage: { type: Boolean, required: true} 
},
{
    timestamps:true
})

warehouseTypeSchema.plugin(mongooseLogs, {
    schemaName: "warehouse",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('wh01', warehouseTypeSchema)