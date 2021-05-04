const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const CitySchema = new Schema({
  country: {
    type: Schema.Types.ObjectId,
    ref: "country",
  },
  link: {
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
CitySchema.plugin(timestamp);

module.exports = User = mongoose.model("ad", CitySchema);
