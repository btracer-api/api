const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema;

const pickingSchema = new mongoose.Schema({
    parentOrder: { type: String },
    parentOrderVolume: { type: Number },
    pickingDate: { type: Date, default: Date.now },
    pickingStatus: { type: String, required: true, enum: ['new', 'draft', 'done', 'cancel'] },
    childOrder: [
        {
            orderno: { type: String },
            orderVolume: { type: String },
        }
    ]
},
    {
        timestamps: true
    })

pickingSchema.plugin(mongooseLogs, {
    schemaName: "picking",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date"
});

module.exports = restful.model('pk01', pickingSchema)