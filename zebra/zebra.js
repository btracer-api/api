const restful = require("node-restful");
const mongoose = restful.mongoose;
const mongooseLogs = require("mongoose-activitylogs");
const Schema = require("mongoose").Schema;

const zebraTypeSchema = new mongoose.Schema(
  {
    orderno: { type: Schema.Types.ObjectId, ref: "lb01" },
    qrcode: { type: String },
    labelType: { type: String, enum: ["DISPLAY", "SACHE"] },
    zebraPrintData: { type: String },
    printStatus: { type: String, enum: ["NEW", "DONE"] },
    label_token: { type: String },
    blockchain_hash: { type: String },
    mapping_code: { type: String },
    comments: { type: String },
  },
  {
    timestamps: true,
  }
);

zebraTypeSchema.plugin(mongooseLogs, {
  schemaName: "zebra",
  createAction: "creation date",
  updateAction: "updated date",
  deleteAction: "deleted date",
});

module.exports = restful.model("zb01", zebraTypeSchema);
