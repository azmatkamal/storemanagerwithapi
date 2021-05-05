const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const CountrySchema = new Schema({
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
  description: {
    type: String,
  },
  country_code: {
    type: String,
  },
  country_phone_code: {
    type: String,
  },
  timezone: {
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
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});
CountrySchema.plugin(timestamp);

module.exports = User = mongoose.model("country", CountrySchema);
