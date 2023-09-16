const router = require("express").Router();
const User = require("../models/User");

router.get("/get-all-users", async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
