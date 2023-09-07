const express = require("express");
const Article = require("../models/Article.model");
const User = require("../models/User.model");
const Country = require("../models/Country.model");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
// Cloudinary
const fileUploader = require("../config/cloudinary.config");

// Get information
router.get("/user-profile", isAuthenticated, async (req, res) => {
  try {
    const user = req.payload;

    const thisUser = await User.findById(user._id)
      .populate("favoritesCountries")
      .populate("visitedCountries")
      .populate("pendingCountries")
      .populate({
        path: "articles",
        populate: {
          path: "country",
          model: "Country",
        },
      });

    res.json(thisUser);
  } catch (error) {
    res.json(error);
  }
});

// Edit information
router.put("/user-profile", isAuthenticated, async (req, res) => {
  const user = req.payload;

  const { firstName, lastName, email, gender, nationality, username } =
    req.body;

  try {
    let updateProfile = await User.findByIdAndUpdate(
      user._id,
      { firstName, lastName, email, gender, nationality, username },
      { new: true }
    );
    res.json(updateProfile);
  } catch (error) {
    res.json(error);
  }
});

// DELETE route to delete a user
router.delete("/user-profile", isAuthenticated, async (req, res) => {
  const user = req.payload;

  try {
    await User.findByIdAndRemove(user._id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.json(error);
  }
});

// Create new Article
router.post("/user-profile/newArticle", isAuthenticated, async (req, res) => {
  const thisUser = req.payload;
  const user = thisUser._id;

  const { generalComment, review, overall, cost, gallery, countryCode } =
    req.body;

  let foundCountry = await Country.findOne({ cca2: countryCode });

  try {
    // Falta adicionar o country code
    // Create a new Article
    let newArticle = await Article.create({
      generalComment,
      review,
      overall,
      cost,
      gallery,
    });
    // Add artcile to User
    await User.findByIdAndUpdate(user, {
      $push: { articles: newArticle._id },
    });

    await Article.findByIdAndUpdate(newArticle._id, {
      $push: { user: user, country: foundCountry._id },
    });

    await Country.findByIdAndUpdate(foundCountry._id, {
      $push: { articles: newArticle._id },
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// Delete article
router.delete("/editArticle/:articleId", async (req, res) => {
  const { articleId } = req.params;

  try {
    await Article.findByIdAndDelete(articleId);
    res.json({ message: "articleId deleted" });
  } catch (error) {
    res.json(error);
  }
});

// Get information about article
router.get("/editArticle/:articleId", async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findById(articleId).populate("country");

    res.json(article);
  } catch (error) {
    res.json(error);
  }
});

// Edit Article
router.put("/editArticle/:articleId", async (req, res) => {
  const { articleId } = req.params;
  const { generalComment, review, overall, cost, gallery } = req.body;

  try {
    let updateArticle = await Article.findByIdAndUpdate(
      articleId,
      {
        generalComment,
        review,
        overall,
        cost,
        gallery,
      },
      { new: true }
    );

    res.json(updateArticle);
  } catch (error) {
    res.json(error);
  }
});

router.post("/upload", fileUploader.single("img"), (req, res, next) => {
  if (!req.file) {
    res.json({ fileUrl: "" });
    return;
  }
  res.json({ fileUrl: req.file.path });
});

module.exports = router;
