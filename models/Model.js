const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const ModelSchema = new Schema({
  brand: {
    type: Schema.Types.ObjectId,
    ref: "brand",
  },
  en_name: {
    type: String,
    required: true,
  },
  ar_name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  year: {
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
ModelSchema.plugin(timestamp);

module.exports = User = mongoose.model("model", ModelSchema);
