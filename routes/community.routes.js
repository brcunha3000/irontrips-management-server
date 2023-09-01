const express = require("express");
const router = express.Router();

// Require Data Models
const User = require("../models/User.model");

// Get Route that gets all users information
router.get("/community", async (req, res) => {
  try {
    let allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
