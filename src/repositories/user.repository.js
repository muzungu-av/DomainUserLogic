const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  isActive: Boolean,
});
const UserModel = mongoose.model("User", userSchema);

async function save(user) {
  const data = {
    email: user.email,
    passwordHash: user.passwordHash,
    isActive: user.isActive,
  };
  const opts = { upsert: true, new: true };
  const updated = await UserModel.findByIdAndUpdate(user.id, data, opts);
  return updated;
}

async function findByEmail(email) {
  return UserModel.findOne({ email });
}

async function findById(id) {
  return UserModel.findById(id);
}

module.exports = { save, findByEmail, findById };
