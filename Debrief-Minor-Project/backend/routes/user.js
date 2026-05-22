const express = require("express");
const router = express.Router();

const User = require("../models/User");
const UserData = require("../models/UserData");
const authMiddleware = require("../middleware/auth");

/* =========================================
   UPDATE PROGRESS
========================================= */

router.post("/progress", authMiddleware, async (req, res) => {
  try {

    // SAFETY CHECK
    if (!req.user || !req.user.email) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const email = req.user.email;
    const { progress } = req.body;

    let user = await User.findOne({ email });

    // CREATE USER IF NOT EXISTS
    if (!user) {
      user = new User({
        email,
        progress: progress || {},
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

    console.log("PROGRESS UPDATE ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

/* =========================================
   GET PROGRESS
========================================= */

router.get("/progress", authMiddleware, async (req, res) => {

  try {

    // SAFETY CHECK
    if (!req.user || !req.user.email) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const email = req.user.email;

    let user = await User.findOne({ email });

    // AUTO CREATE USER
    if (!user) {

      user = new User({
        email,
        progress: {},
      });

      await user.save();
    }

    res.json(user.progress || {});

  } catch (err) {

    console.log("GET PROGRESS ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

/* =========================================
   TOTAL USERS
========================================= */

router.get("/total-users", async (req, res) => {
  try {

    const count = await User.countDocuments();

    res.json({
      totalUsers: count,
    });

  } catch (err) {

    console.log("TOTAL USERS ERROR:", err);

    res.status(500).json({
      message: "Error fetching users",
    });
  }
});

/* =========================================
   SAVE NOTES
========================================= */

router.post("/notes", async (req, res) => {

  try {

    const { userId, notes } = req.body;

    let data = await UserData.findOne({ userId });

    if (!data) {

      data = new UserData({
        userId,
        notes,
      });

    } else {

      data.notes = notes;
    }

    await data.save();

    res.json({
      success: true,
    });

  } catch (err) {

    console.log("SAVE NOTES ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

/* =========================================
   GET NOTES
========================================= */

router.get("/notes/:userId", async (req, res) => {

  try {

    let data = await UserData.findOne({
      userId: req.params.userId,
    });

    // AUTO CREATE
    if (!data) {

      data = new UserData({
        userId: req.params.userId,
        notes: {},
        revision: {},
      });

      await data.save();
    }

    res.json(data.notes || {});

  } catch (err) {

    console.log("NOTES ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

/* =========================================
   SAVE REVISION
========================================= */

router.post("/revision", async (req, res) => {

  try {

    const { userId, revision } = req.body;

    let data = await UserData.findOne({ userId });

    if (!data) {

      data = new UserData({
        userId,
        revision,
      });

    } else {

      data.revision = revision;
    }

    await data.save();

    res.json({
      success: true,
    });

  } catch (err) {

    console.log("SAVE REVISION ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

/* =========================================
   GET REVISION
========================================= */

router.get("/revision/:userId", async (req, res) => {

  try {

    let data = await UserData.findOne({
      userId: req.params.userId,
    });

    // AUTO CREATE
    if (!data) {

      data = new UserData({
        userId: req.params.userId,
        notes: {},
        revision: {},
      });

      await data.save();
    }

    res.json(data.revision || {});

  } catch (err) {

    console.log("REVISION ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

/* =========================================
   UPDATE STREAK
========================================= */

router.post("/update-streak", async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const last = user.lastActiveDate
      ? new Date(user.lastActiveDate)
      : null;

    if (last) {
      last.setHours(0, 0, 0, 0);
    }

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // ALREADY COUNTED TODAY
    if (last && last.getTime() === today.getTime()) {

      return res.json({
        streak: user.streak,
        message: "already counted",
      });

    }

    // CONTINUOUS STREAK
    else if (last && last.getTime() === yesterday.getTime()) {

      user.streak += 1;

    }

    // RESET STREAK
    else {

      user.streak = 1;
    }

    user.lastActiveDate = today;

    if (user.streak > user.longestStreak) {
      user.longestStreak = user.streak;
    }

    await user.save();

    res.json({
      streak: user.streak,
      longestStreak: user.longestStreak,
    });

  } catch (err) {

    console.log("STREAK ERROR:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;