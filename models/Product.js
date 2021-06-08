const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const CitySchema = new Schema({
  sub_category: {
    type: Schema.Types.ObjectId,
    ref: "subcategory",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  en_name: {
    type: String,
    required: true,
  },
  ar_name: {
    type: String,
    required: true,
  },
  en_desc: {
    type: String,
  },
  ar_desc: {
    type: String,
  },
  en_treatment: {
    type: String,
  },
  ar_treatment: {
    type: String,
  },
  width: {
    type: String,
  },
  height: {
    type: String,
  },
  size: {
    type: String,
  },
  price: {
    type: String,
  },
  currency_code: {
    type: String,
  },
  is_featured: {
    type: Boolean,
    default: false,
  },
  stock_count: {
    type: String,
  },
  stock_alert: {
    type: String,
  },
  colors: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "color",
      },
    },
  ],
  img1: {
    type: String,
  },
  img2: {
    type: String,
  },
  img3: {
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
CitySchema.plugin(timestamp);

module.exports = User = mongoose.model("product", CitySchema);

// sub_category:
// en_name:
// ar_name:
// en_desc:
// ar_desc:
// en_treatment:
// ar_treatment:
// width:
// height:
// size:
// price:
// currency_code:
// is_featured:
// stock_count:
// stock_alert:
// img1:
// img2:
// img3:
// colors:
