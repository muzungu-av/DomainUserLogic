const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route");
const dbConfig = require("./config/db.config");

(async () => {
  await mongoose.connect(dbConfig.url, dbConfig.options);
  const app = express();
  app.use(express.json());
  app.use("/users", userRouter);
  app.listen(3000, () => console.log("Server started on 3000"));
})();
