const { Schema, model } = require("mongoose");

const contactsSchema = new Schema(
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
    age: {
      type: Date,
    },
    nationality: {
      type: String,
    },
    linkedinProfile: {
      type: String,
    },
    githubProfile: {
      type: String,
    },
    contactPicture: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Contacts = model("Contacts", contactsSchema);

module.exports = Contacts;
