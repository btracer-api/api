const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema;

const packingSchema = new mongoose.Schema({
    parentOrder: { type: String },
    boxtype: { type: String },
    boxserial: { type: String },
    packingDate: { type: Date, default: Date.now },
    packingStatus: { type: String, required: true, enum: ['new', 'draft', 'done', 'cancel'] },
    pallet: [
        {
            serial: { type: String }
        }
    ]
},
    {
        timestamps: true
    })

packingSchema.plugin(mongooseLogs, {
    schemaName: "packing",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date"
});

module.exports = restful.model('pk02', packingSchema)