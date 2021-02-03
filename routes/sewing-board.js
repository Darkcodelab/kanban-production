const express = require("express");
const router = express.Router();
const path = require("path");
const SewingBoard = require("../models/SewingBoard");
const SewingBoardInProgress = require("../models/SewingBoardInProgress");
const SewingBoardCompleted = require("../models/SewingBoardCompleted");
const AvailableProducts = require("../models/AvailableProducts");
let FinishingBoard = require("../models/FinishingBoard");
let ReworkKanbanCard = require("../models/ReworkKanbanCard");
let PerformanceAnalyze = require("../models/PerformanceAnalyze");

//Method = GET
//Route = /sewing-board
router.get("/", async (req, res) => {
  let data = await SewingBoard.find({}).lean();
  let reworkdata = await ReworkKanbanCard.find({}).lean();
  let inProgress = await SewingBoardInProgress.find({}).lean();
  let completed = await SewingBoardCompleted.find({})
    .sort({ published: -1 })
    .limit(5)
    .lean();
  res.render(path.join(__dirname, "../", "/views/sewing-board"), {
    data,
    inProgress,
    completed,
    reworkdata,
  });
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let deletedCard = await SewingBoard.findOneAndDelete({ id: id }).lean();
  let newInprogressCard = {};
  Object.keys(deletedCard).forEach(function (prop) {
    if (prop != "_id" || prop != "__v") {
      newInprogressCard[prop] = deletedCard[prop];
    }
  });
  let inProgressCard = await SewingBoardInProgress.create(newInprogressCard);
  res.redirect("/sewing-board");
});

router.get("/completed/:id", async (req, res) => {
  let id = req.params.id;
  let deletedCard = await SewingBoardInProgress.findOneAndDelete({
    id: id,
  }).lean();
  let newCompletedCard = {};
  Object.keys(deletedCard).forEach(function (prop) {
    if (prop != "_id" || prop != "__v")
      newCompletedCard[prop] = deletedCard[prop];
  });
  let completedCard = await SewingBoardCompleted.create(newCompletedCard);
  let deleteCuttingAvailableProduct = await AvailableProducts.findOneAndDelete({
    id: id,
    dept: "cutting",
  });
  newCompletedCard.dept = "sewing";
  let availableCard = await AvailableProducts.create(newCompletedCard);
  let FinishingBoardCard = await FinishingBoard.create(newCompletedCard);
  let performance = await PerformanceAnalyze.create(newCompletedCard);
  res.redirect("/sewing-board");
});

module.exports = router;
