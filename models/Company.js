const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const CompanySchema = new Schema({
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
  ar_desc: {
    type: String,
  },
  en_desc: {
    type: String,
  },
  address: {
    type: String,
  },
  location: {
    type: String,
  },
  tel: {
    type: String,
  },
  mobile1: {
    type: String,
  },
  mobile2: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  snapchat: {
    type: String,
  },
  youtube: {
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
CompanySchema.plugin(timestamp);

module.exports = User = mongoose.model("company", CompanySchema);
