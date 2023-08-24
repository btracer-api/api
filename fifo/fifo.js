const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema;

const fifoSchema = new mongoose.Schema({
    // warehouse: { type: Schema.Types.ObjectId, ref: 'wh01' },
    warehouse: { type: String },
    incomeDate: { type: Date, default: Date.now },
    status: { type: String, required: true, enum: ['new', 'processing', 'done', 'cancel'] },
    orderno: { type: String, required: 'Uma ordem de produçao é necessaria' }, //Harvest Order or Parent Order
    graininfo: { type: String },
    serial: [{ type: String }],
    serialQuantity: { type: Number, required: true } // - Amount of Serial
},
    {
        timestamps: true
    })

fifoSchema.plugin(mongooseLogs, {
    schemaName: "fifo",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date"
});

module.exports = restful.model('ff01', fifoSchema)