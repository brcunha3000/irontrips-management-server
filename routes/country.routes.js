const express = require("express");
const router = express.Router();

// Require Data Models
const Country = require("../models/Country.model");
const User = require("../models/User.model");
const Article = require("../models/Article.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// Get Route that gets all the project
router.get("/countries", async (req, res) => {
  try {
    let allCountries = await Country.find();
    res.json(allCountries);
  } catch (error) {
    res.json(error);
  }
});

// Get Route that gets info of specific project
router.get("/:countryCode", async (req, res) => {
  const { countryCode } = req.params;

  try {
    let foundCountry = await Country.findOne({ cca2: countryCode });

    foundCountry.populate("articles");

    res.json(foundCountry);
  } catch (error) {
    res.json(error);
  }
});

// Favourite Country action
router.post("/addFavorites/:countryCode", isAuthenticated, async (req, res) => {
  const { countryCode } = req.params;
  // User
  const thisUser = req.payload;
  const currentUser = await User.findById(thisUser._id);
  // Get country
  let foundCountry = await Country.findOne({ cca2: countryCode });
  const isFav = currentUser.favoritesCountries.includes(foundCountry._id);
  let numLikes = foundCountry.favorites;

  try {
    if (!isFav) {
      currentUser.favoritesCountries.push(foundCountry._id);
      await Country.findByIdAndUpdate(foundCountry._id, {
        favorites: numLikes + 1,
      });
    } else {
      currentUser.favoritesCountries.pull(foundCountry._id);
      await Country.findByIdAndUpdate(foundCountry._id, {
        favorites: numLikes - 1,
      });
    }
    await currentUser.save();

    res.json(!isFav);
  } catch (error) {
    res.json(error);
  }
});

// Visited Country action
router.post("/addVisited/:countryCode", isAuthenticated, async (req, res) => {
  const { countryCode } = req.params;
  // User
  const thisUser = req.payload;
  const currentUser = await User.findById(thisUser._id);
  // Get country
  let foundCountry = await Country.findOne({ cca2: countryCode });
  const isVisited = currentUser.visitedCountries.includes(foundCountry._id);

  try {
    if (!isVisited) {
      currentUser.visitedCountries.push(foundCountry._id);
      await Country.findByIdAndUpdate(foundCountry._id, {});
    } else {
      currentUser.visitedCountries.pull(foundCountry._id);
      await Country.findByIdAndUpdate(foundCountry._id, {});
    }

    await currentUser.save();

    res.json(!isVisited);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
