const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema;

const setsTypeSchema = new mongoose.Schema({
    region: { type: Schema.Types.ObjectId, ref: 'rm01'},
    high: { type: String, required: 'Favor informar a altura!'},
    weather: { type: String, required: 'Dados de clima nao informados.'},
    seasonBegin: { type: String, required: 'Inicio da Safra'},
    seasonEnd: { type: String, required: 'Termino da Safra'},
    harvestDate: { type: String, required: 'Data da colheira precisa ser informada!'},
    farmname: { type: String, required: 'Favor informar a Fazenda!' },
    owner: { type: Schema.Types.ObjectId, ref: 'usrm01' },
    lot: { type: String },
    graintype: { type: Schema.Types.ObjectId, ref: 'gvm01'},
    usage: { type: Boolean, required: true }     
},
{
    timestamps:true
})

setsTypeSchema.plugin(mongooseLogs, {
    schemaName: "sets",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('set01', setsTypeSchema)