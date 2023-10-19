const mongoose = require("mongoose");
const AdminUserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const AdminUser = mongoose.model("AdminUser", AdminUserSchema);

module.exports = AdminUser;