const express = require("express");
const router = express.Router();

// Require Data Models
const Country = require("../models/Country.model");
const User = require("../models/User.model");
const Article = require("../models/Article.model");

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
    /* const currentUser = req.session.currentUser;*/

    try {
        let foundCountry = await Country.findOne({ cca3: countryCode });
        const thisUser = await User.findById("64f0cd0d4dd998b6120c21b9");

        foundCountry.populate("articles");

        console.log(foundCountry.favorites);

        /* await thisUser.save();
        foundCountry = { ...foundCountry.toObject(), isFav }; */
        res.json(foundCountry);
    } catch (error) {
        res.json(error);
    }
});

// Favourite Country action
router.post("/addFavorites/:countryCode", async (req, res) => {
    const { countryCode } = req.params;
    /*  const currentUser = req.session.currentUser; */
    // Get country
    let foundCountry = await Country.findOne({ cca3: countryCode });
    const thisUser = await User.findById("64f0ec79db7e8546e60b854d");
    const isFav = thisUser.favoritesCountries.includes(foundCountry._id);

    try {
        if (!isFav) {
            thisUser.favoritesCountries.push(foundCountry._id);
            /* foundCountry.favorites.push(thisUser._id); */
        } else {
            thisUser.favoritesCountries.pull(foundCountry._id);
            /* foundCountry.favorites.pull(thisUser._id); */
        }
        /* const favCountry = await User.findByIdAndUpdate(
            "64f0cd0d4dd998b6120c21b9",
            {
                $push: { favoritesCountries: idCountry },
            }
        ); */
        await thisUser.save();

        res.json(!isFav);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
