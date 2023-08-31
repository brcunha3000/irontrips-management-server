const express = require("express");
const router = express.Router();

// Require Data Models
const Country = require("../models/Country.model");

// Get Route that gets all the project
router.get("/countries", async (req, res) => {
    try {
        let allCountries = await Country.find();
        res.json(allCountries);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
