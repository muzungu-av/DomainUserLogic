const { Router } = require("express");
const userService = require("../services/user.service");
const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    const userId = await userService.register(req.body);
    res.status(201).json({ userId });
  } catch (e) {
    next(e);
  }
});

router.post("/activate", async (req, res, next) => {
  try {
    const { userId } = req.body;
    await userService.activate(userId);
    res.json({ message: "Activated" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
