const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const DistrictSchema = new Schema({
  country: {
    type: Schema.Types.ObjectId,
    ref: "country",
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: "city",
  },
  district: {
    type: Schema.Types.ObjectId,
    ref: "district",
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
  lat: {
    type: String,
  },
  lng: {
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
DistrictSchema.plugin(timestamp);

module.exports = User = mongoose.model("stadium", DistrictSchema);
