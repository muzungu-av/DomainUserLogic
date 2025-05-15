module.exports = {
  url:
    process.env.MONGO_URI ||
    "mongodb://admin:admin@localhost:27017/DomainUserLogic?authSource=admin",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
};
