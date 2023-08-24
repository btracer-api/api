const restful = require("node-restful");
const mongoose = restful.mongoose;
const mongooseLogs = require("mongoose-activitylogs");
const Schema = require("mongoose").Schema;

const shippingSchema = new mongoose.Schema(
  {
    shipno: { type: String },
    nfReference: { type: String },
    serial: [{ type: String }],
    shipDate: { type: Date, default: Date.now },
    logData: [
      {
        dlog: { type: Date },
        dinfo: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

shippingSchema.plugin(mongooseLogs, {
  schemaName: "shipping",
  createAction: "creation date",
  updateAction: "updated date",
  deleteAction: "deleted date",
});

module.exports = restful.model("sp01", shippingSchema);
