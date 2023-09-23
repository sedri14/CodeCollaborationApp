const express = require("express");
const router = express.Router();
const CodeBlock = require("../models/codeblock");

//Get all
router.get("/", async (req, res) => {
  try {
    const codeblocks = await CodeBlock.find();
    res.json(codeblocks);
  } catch (err) {}
});

//Get a code block by id
router.get("/:id", getCodeblock, (req, res) => {
  res.json(res.codeblock);
});

async function getCodeblock(req, res, next) {
  let codeblock;

  try {
    codeblock = await CodeBlock.findById(req.params.id);
    if (codeblock == null) {
      return res.status(404).json({ message: "Cannot find code block" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.codeblock = codeblock;
  next();
}

module.exports = router;
