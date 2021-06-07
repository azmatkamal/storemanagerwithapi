const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const NewsMediaSchema = new Schema({
  media_type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  tel: {
    type: String,
  },
  icon: {
    type: String,
  },
  date: {
    type: String,
  },
  internal_link: {
    type: String,
  },
  external_link: {
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
NewsMediaSchema.plugin(timestamp);

module.exports = User = mongoose.model("ad", NewsMediaSchema);
