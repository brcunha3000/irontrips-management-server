const { Schema, model } = require("mongoose");

const countrySchema = new Schema(
  {
    name: { type: String },
    flag: { type: String },
    flags: { type: String },
    region: { type: String },
    capital: { type: String },
    currencies: {type: String},
    languages: {type: String},
    area: {type: Number},
    map: {type: String},
    borders: [String],
    cities: [String],
    articles: {type: Schema.Types.ObjectId, ref: "Article"},
  },
  {
    timestamps: true,
  }
);

const Country = model("Country", countrySchema);

module.exports = Country;