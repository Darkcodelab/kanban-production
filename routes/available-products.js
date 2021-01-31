const express = require("express");
const router = express.Router();
const path = require("path");

//Method = GET
//Route = /available-products
router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../", "/views/available-products"));
});

module.exports = router;
