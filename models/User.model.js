const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required."],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required."],
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required."],
        },
        gender: {
            type: String,
            enum: [
                "male",
                "female",
                "non-binary",
                "other",
                "prefer-not-to-say",
            ],
        },
        nationality: {
            type: String,
        },
        profilePicture: {
            type: String,
            default:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        favoritesCountries: [
            {
                type: Schema.Types.ObjectId,
                ref: "Country",
            },
        ],
        visitedCountries: [
            {
                type: Schema.Types.ObjectId,
                ref: "Country",
            },
        ],
        articles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Article",
            },
        ],
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const User = model("User", userSchema);

module.exports = User;
