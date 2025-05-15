module.exports = {
  url: process.env.MONGO_URI || "mongodb://localhost:27017/ddd_users",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
};
