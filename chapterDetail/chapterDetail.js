const restful = require("node-restful");
const mongoose = restful.mongoose;
const mongooseLogs = require("mongoose-activitylogs");
const Schema = require("mongoose").Schema;

const chapterDetailSchema = new mongoose.Schema(
  {
    chapter: { type: Schema.Types.ObjectId, ref: "cu01" },
    grainType: { type: Schema.Types.ObjectId, ref: "gvm01" },
    flavorDescription: { type: String },
    packageType: { type: String },
    processDescribed: { type: String },
    certificates: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

chapterDetailSchema.plugin(mongooseLogs, {
  schemaName: "chapterDetail",
  createAction: "creation date",
  updateAction: "updated date",
  deleteAction: "deleted date",
});

module.exports = restful.model("ch02", chapterDetailSchema);
