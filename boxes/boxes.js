const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')

const boxesSchema = new mongoose.Schema({
    boxtype: { type: String },
    description: { type: String },
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
    volume: { type: Number },
    maxpacks: { type: Number },
    usage: { type: Boolean, required: true }
},
    {
        timestamps: true
    })

boxesSchema.plugin(mongooseLogs, {
    schemaName: "boxes",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date"
});

module.exports = restful.model('bx01', boxesSchema)