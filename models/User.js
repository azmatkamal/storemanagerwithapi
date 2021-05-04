const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissions: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "permission",
      },
    },
  ],
  user_type: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.plugin(timestamp);
UserSchema.method = {
  toJSON() {
    const user = this.toObject();
    delete user.password;
    return {
      user,
    };
  },
};

module.exports = User = mongoose.model("users", UserSchema);
