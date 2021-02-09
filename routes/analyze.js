const router = require("express").Router();
const path = require("path");
let PerformanceAnalyze = require("../models/PerformanceAnalyze");

router.get("/", async (req, res) => {
  let fabric = await PerformanceAnalyze.find({ dept: "fabric" }, "-_id -__v")
    .sort({ published: -1 })
    .limit(5)
    .lean();
  let cutting = await PerformanceAnalyze.find({ dept: "cutting" }, "-_id -__v")
    .sort({ published: -1 })
    .limit(5)
    .lean();
  let sewing = await PerformanceAnalyze.find({ dept: "sewing" }, "-_id -__v")
    .sort({ published: -1 })
    .limit(5)
    .lean();
  let finishing = await PerformanceAnalyze.find(
    { dept: "finishing" },
    "-_id -__v"
  )
    .sort({ published: -1 })
    .limit(5)
    .lean();
  res.render(path.join(__dirname, "../", "/views/analyze"), {
    fabric,
    cutting,
    sewing,
    finishing,
  });
});

module.exports = router;
