const express = require("express");
const router = express.Router();
const path = require("path");

//Method = GET
//Route = /fabric-inspection-board
router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../", "/views/fabric-inspection-board"));
});

module.exports = router;
