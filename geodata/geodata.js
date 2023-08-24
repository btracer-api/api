const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema;

const geoDataSchema = new mongoose.Schema({
    farm: { type: Schema.Types.ObjectId, ref: 'fm01'},
    altitudeData1: { type : String, required: 'An Altitude1 is needed!' },
    altitudeData2: { type : String, required: 'An Altitude2 is needed!' },
    geoData1: { type : String, required: 'An Geo Data 1 is needed!' },
    geoData2: { type : String, required: 'An Geo Data 2 is needed!' },
    gyroData1: { type : String, required: 'An Gyro Data 1 is needed!' },
    gyroData2: { type : String, required: 'An Gyro Data 2 is needed!' },
    touchDate: { type : Date, default: Date.now},
    harvestDate: { type : Date, default: Date.now}
},
{
    timestamps:true
})

geoDataSchema.plugin(mongooseLogs, {
    schemaName: "Farm Gyro Data",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date" 
 });

module.exports = restful.model('fgpsd01', geoDataSchema)