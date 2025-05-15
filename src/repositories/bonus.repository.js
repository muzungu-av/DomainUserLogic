const mongoose = require("mongoose");
const bonusSchema = new mongoose.Schema({ userId: String, amount: Number });
const BonusModel = mongoose.model("Bonus", bonusSchema);

async function assign(userId, amount) {
  return BonusModel.create({ userId, amount });
}

module.exports = { assign };
