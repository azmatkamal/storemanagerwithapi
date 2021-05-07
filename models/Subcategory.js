const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const SubcategorySchema = new Schema({
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
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});
SubcategorySchema.plugin(timestamp);

module.exports = User = mongoose.model("subcategory", SubcategorySchema);
