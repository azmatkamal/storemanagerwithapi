const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const NewsMediaSchema = new Schema({
  news: {
    type: Schema.Types.ObjectId,
    ref: "news",
  },
  media_type: {
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
NewsMediaSchema.plugin(timestamp);

module.exports = User = mongoose.model("newsmedia", NewsMediaSchema);
