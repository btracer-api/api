const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')

const vehicleTypeSchema = new mongoose.Schema({
    plate: { type: String, required: 'A plate for vehicle is needed!'},
    brand: { type: String, required: 'A brand for vehicle is needed!'},
    model: { type: String, required: 'A model for vehicle is needed!'},
    year: { type: String, required: 'A year for vehicle is needed!'},
    motor: { type: String, required: 'A motor for vehicle is needed!'},
    type: { type : String, required: 'A type is mandatory', enum:['carro','caminhão','bicicleta','navio','avião','ônibus','motocicleta']},
    description: { type : String },
    usage: { type: Boolean, required: true} 
},
{
    timestamps:true
})

vehicleTypeSchema.plugin(mongooseLogs, {
    schemaName: "vehicle",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('vm01', vehicleTypeSchema)