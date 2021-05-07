const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const CategorySchema = new Schema({
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
  is_active: {
    type: Boolean,
    default: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});
CategorySchema.plugin(timestamp);

module.exports = User = mongoose.model("category", CategorySchema);
