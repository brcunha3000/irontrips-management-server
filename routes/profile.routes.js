const express = require("express");
const Article = require("../models/Article.model");
const User = require("../models/User.model");
const router = express.Router();

router.get("/user-profile", async (req, res) => {
    try {
        /* const user = req.session.currentUser;
         */
        const idTeste = "64f0ec79db7e8546e60b854d";
        const user = await User.findById(idTeste);

        //console.log(user);

        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

// Create new Article
router.post("/user-profile/create", async (req, res) => {
    try {
        /* const user = req.session.currentUser;
         */
        /* const currentUser = await User.findById(idTeste); */

        // Testes
        const currentUser = "64f0ec79db7e8546e60b854d";

        //console.log(user);

        const {
            generalComment,
            review,
            overall,
            cost,
            gallery,
            country,
            user,
        } = req.body;

        try {
            // Create a new Article
            let newArticle = await Article.create({
                generalComment,
                review,
                overall,
                cost,
                gallery,
                country,
                user,
            });
            // Add artcile to User
            await User.findByIdAndUpdate(currentUser, {
                $push: { articles: newArticle._id },
            });
        } catch (error) {
            res.json(currentUser);
        }

        res.json(currentUser);
    } catch (error) {
        res.json(error);
    }
});

// Edit Article
router.put("/user-profile/:articleId", async (req, res) => {
    const { articleId } = req.params;
    const { generalComment, review, overall, cost, gallery, country, user } =
        req.body;

    try {
        let updateArticle = await Article.findByIdAndUpdate(
            articleId,
            {
                generalComment,
                review,
                overall,
                cost,
                gallery,
                country,
                user,
            },
            { new: true }
        );

        res.json(updateArticle);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
