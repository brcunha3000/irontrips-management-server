// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const contactsRoutes = require("./routes/contacts.routes");
app.use("/", contactsRoutes);

const communityRoutes = require("./routes/community.routes");
app.use("/", communityRoutes);

const galleryRoutes = require("./routes/gallery.routes");
app.use("/", galleryRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/", profileRoutes);

const countryRoutes = require("./routes/country.routes");
app.use("/theglobe", countryRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
