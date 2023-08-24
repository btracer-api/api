const restful = require("node-restful");
const mongoose = restful.mongoose;
const mongooseLogs = require("mongoose-activitylogs");
const Schema = require("mongoose").Schema;

const customerTypeSchema = new mongoose.Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "cu01" },
    chapterToDeliver: { type: Schema.Types.ObjectId, ref: "ch02" },
    chapterHistory: [{ type: Schema.Types.ObjectId, ref: "ch02" }],
  },
  {
    timestamps: true,
  }
);

customerTypeSchema.plugin(mongooseLogs, {
  schemaName: "customerSchedule",
  createAction: "creation date",
  updateAction: "updated date",
  deleteAction: "deleted date",
});

module.exports = restful.model("cu02", customerTypeSchema);
