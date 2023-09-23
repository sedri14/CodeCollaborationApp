const mongoose = require("mongoose");

const codeblockSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CodeBlock", codeblockSchema);
