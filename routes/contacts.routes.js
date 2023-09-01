const express = require("express");
const router = express.Router();

// Require Data Models
const Contacts = require("../models/Contacts.model");

// Get Route that gets all the project
router.get("/contacts", async (req, res) => {
  try {
    let allContacts = await Contacts.find();
    res.json(allContacts);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
