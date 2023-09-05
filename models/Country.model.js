const { Schema, model, SchemaType } = require("mongoose");

const countrySchema = new Schema(
    {
        name: {
            common: {
                type: String,
            },
        },

        favorites: { type: Number, default: 0 },
        cca2: { type: String },
        cca3: { type: String },
        flag: { type: String },
        flags: {
            png: {
                type: String,
            },
            svg: {
                type: String,
            },
        },
        region: { type: String },
        capital: [String],
        currencies: { type: String },
        languages: { type: String },
        area: { type: Number },
        map: {
            googleMaps: {
                type: String,
            },
        },
        borders: [String],
        cities: [String],
        articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    },
    {
        timestamps: true,
    }
);

const Country = model("Country", countrySchema);

module.exports = Country;
