const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema(
  {
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Img", imgSchema);
