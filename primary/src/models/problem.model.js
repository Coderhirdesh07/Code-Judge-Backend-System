const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    topics: {
      type: String,
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
