const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const ColorSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  en_name: {
    type: String,
    required: true,
  },
  ar_name: {
    type: String,
    required: true,
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
ColorSchema.plugin(timestamp);

module.exports = User = mongoose.model("color", ColorSchema);
