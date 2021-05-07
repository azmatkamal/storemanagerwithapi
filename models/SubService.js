const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const SubserviceSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: "service",
  },
  en_name: {
    type: String,
    required: true,
  },
  ar_name: {
    type: String,
    required: true,
  },
  en_desc: {
    type: String,
    required: true,
  },
  ar_desc: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  price: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});
SubserviceSchema.plugin(timestamp);

module.exports = User = mongoose.model("subservice", SubserviceSchema);
