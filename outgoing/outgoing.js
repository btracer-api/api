const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema;

const outgoingSchema = new mongoose.Schema({
    lotno: { type: String },
    nfReference: { type:String },
    serial: { type: String },
    outgoingDate: { type: Date, default: Date.now },
    logData: [{
        dlog: { type: Date },
        dinfo: { type: String }
    }],
    blockchainRef: { type:String }
},
    {
        timestamps: true
    })

outgoingSchema.plugin(mongooseLogs, {
    schemaName: "outgoing",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date"
});

module.exports = restful.model('og01', outgoingSchema)