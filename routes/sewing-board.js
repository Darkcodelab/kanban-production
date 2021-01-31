const express = require("express");
const router = express.Router();
const path = require("path");

//Method = GET
//Route = /sewing-board
router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../", "/views/sewing-board"));
});

module.exports = router;
