const express = require("express");
const router = express.Router();
const path = require("path");

//Method = GET
//Route = /cutting-board
router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../", "/views/cutting-board"));
});

module.exports = router;
