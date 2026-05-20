const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const UserData = require("../models/UserData");

// ✅ UPDATE progress
router.post("/progress", authMiddleware, async (req, res) => {
  const email = req.user.email;
  const { progress } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        progress,
      });
    } else {
      user.progress = {
        ...user.progress,
        ...progress,
      };
    }

    await user.save();

    res.json(user.progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET progress
router.get("/progress", authMiddleware, async (req, res) => {
  const email = req.user.email;

  try {
    const user = await User.findOne({ email });
    res.json(user?.progress || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ TOTAL USERS
router.get("/total-users", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalUsers: count });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});
router.post("/notes", async (req, res) => {
  try {
    const { userId, notes } = req.body;

    let data = await UserData.findOne({ userId });

    if (!data) {
      data = new UserData({ userId, notes });
    } else {
      data.notes = notes;
    }

    await data.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/notes/:userId", async (req, res) => {
  try {
    let data = await UserData.findOne({
      userId: req.params.userId,
    });

    // ✅ AUTO CREATE IF NOT EXISTS
    if (!data) {
      data = new UserData({
        userId: req.params.userId,
        notes: {},
        revision: {},
      });

      await data.save();
    }

    res.json(data.notes);
  } catch (err) {
    console.log("NOTES ERROR:", err); // 👈 IMPORTANT
    res.status(500).json({ error: err.message });
  }
});
router.post("/revision", async (req, res) => {
  try {
    const { userId, revision } = req.body;

    let data = await UserData.findOne({ userId });

    if (!data) {
      data = new UserData({ userId, revision });
    } else {
      data.revision = revision;
    }

    await data.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/revision/:userId", async (req, res) => {
  try {
    let data = await UserData.findOne({
      userId: req.params.userId,
    });

    if (!data) {
      data = new UserData({
        userId: req.params.userId,
        notes: {},
        revision: {},
      });

      await data.save();
    }

    res.json(data.revision);
  } catch (err) {
    console.log("REVISION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
// POST /api/user/update-streak
router.post("/update-streak", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to midnight

    const last = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    if (last) last.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (last && last.getTime() === today.getTime()) {
      // Already counted today — do nothing
      return res.json({ streak: user.streak, message: "already counted" });
    } else if (last && last.getTime() === yesterday.getTime()) {
      // Consecutive day — increment
      user.streak += 1;
    } else {
      // Missed a day or new user — reset
      user.streak = 1;
    }

    user.lastActiveDate = today;
    if (user.streak > user.longestStreak) {
      user.longestStreak = user.streak;
    }

    await user.save();
    res.json({ streak: user.streak, longestStreak: user.longestStreak });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;