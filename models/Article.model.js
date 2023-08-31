const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    generalComment: { type: String, required: true },
    review: { type: String, required: true },
    overall: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    cost: {
      type: String,
      enum: ["Budget-Friendly", "Moderate", "Expensive", "Luxury"],
    },
    gallery: [{ type: String }],
    country: { type: Schema.Types.ObjectId, ref: "Country" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("Article", articleSchema);

module.exports = User;
