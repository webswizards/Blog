const mongoose = require("mongoose");

// Define the Tags schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  seoTitle: {
    type: String,
  },
  seoDescription: {
    type: String,
  },
  canonical: {
    type: String,
  },
  keywords: {
    type: String,
  },
  image: {
    type: String,
  },
});

// Export the Tags model
module.exports = mongoose.model("Category", categorySchema);
