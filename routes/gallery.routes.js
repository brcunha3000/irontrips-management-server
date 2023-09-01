const express = require("express");
const router = express.Router();

// Require Data Models
const Article = require("../models/Article.model");

// Get Route that gets all users information
router.get("/gallery", async (req, res) => {
  try {
    let allArticles = await Article.find();

    const allPhotos = allArticles.reduce((photos, article) => {
      if (article.gallery && article.gallery.length > 0) {
        photos.push(...article.gallery);
      }
      return photos;
    }, []);

    res.json(allPhotos);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
