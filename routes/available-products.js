const express = require("express");
const router = express.Router();
const path = require("path");
let AvailableProducts = require("../models/AvailableProducts");

//Method = GET
//Route = /available-products
router.get("/", async (req, res) => {
  let fabric = await AvailableProducts.find({ dept: "fabric" }).lean();
  let cutting = await AvailableProducts.find({ dept: "cutting" }).lean();
  let sewing = await AvailableProducts.find({ dept: "sewing" }).lean();
  res.render(path.join(__dirname, "../", "/views/available-products"), {
    fabric,
    cutting,
    sewing,
  });
});

module.exports = router;
