const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const NewsSchema = new Schema({
  header: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  year: {
    type: String,
  },
  client_name: {
    type: String,
  },
  date: {
    type: String,
  },
  allow_comment: {
    type: String,
  },
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  service: {
    type: String,
  },
  subservice: {
    type: String,
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
NewsSchema.plugin(timestamp);

module.exports = User = mongoose.model("news", NewsSchema);
