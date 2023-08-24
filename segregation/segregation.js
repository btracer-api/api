const restful = require('node-restful')
const mongoose = restful.mongoose
const mongooseLogs = require('mongoose-activitylogs')
const Schema = require('mongoose').Schema;

const segregationSchema = new mongoose.Schema({
    chapter: { type: Schema.Types.ObjectId, ref: 'ch01' },
    label: { type: String  },
    segregationDate: { type: Date, default: Date.now }
},
    {
        timestamps: true
    })

segregationSchema.plugin(mongooseLogs, {
    schemaName: "segretation",
    createAction: "creation date",
    updateAction: "updated date",
    deleteAction: "deleted date"
});

module.exports = restful.model('st02', segregationSchema)