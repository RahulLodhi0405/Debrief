const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/google-login", async (req, res) => {
  const { name, email, photoURL } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, photoURL });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;