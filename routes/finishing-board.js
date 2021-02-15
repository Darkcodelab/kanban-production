const express = require("express");
const router = express.Router();
const path = require("path");
const SewingBoard = require("../models/SewingBoardCompleted");
let AvailableProducts = require("../models/AvailableProducts");
let FinishingBoard = require("../models/FinishingBoard");
let FinishingBoardInProgress = require("../models/FinishingBoardInProgress");
let FinishingBoardCompleted = require("../models/FinishingBoardCompleted");
let PerformanceAnalyze = require("../models/PerformanceAnalyze");

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    let data = req.flash("message")[0];
    res.render(path.join(__dirname, "../", "/views/login"), {
      message: "",
      data,
    });
  }
}

router.get("/", async (req, res) => {
  let data = await FinishingBoard.find({}, "-_id -__v").lean();
  let inProgress = await FinishingBoardInProgress.find({}, "-_id -__v").lean();
  let completed = await FinishingBoardCompleted.find({}, "-_id -__v")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  res.render(path.join(__dirname, "../", "/views/finishing-board"), {
    data,
    inProgress,
    completed,
  });
});

router.get("/:id", checkAuth, async (req, res) => {
  let id = req.params.id;
  let deletedCard = await FinishingBoard.findOneAndDelete({ id: id }).lean();
  let newInprogressCard = {};
  Object.keys(deletedCard).forEach(function (prop) {
    if (prop != "_id" || prop != "__v") {
      newInprogressCard[prop] = deletedCard[prop];
    }
  });
  let inProgressCard = await FinishingBoardInProgress.create(newInprogressCard);
  res.redirect("/finishing-board");
});

router.get("/completed/:id", checkAuth, async (req, res) => {
  let id = req.params.id;
  let deletedCard = await FinishingBoardInProgress.findOneAndDelete({
    id: id,
  }).lean();
  let newCompletedCard = {};
  Object.keys(deletedCard).forEach(function (prop) {
    if (prop != "_id" || prop != "__v") {
      newCompletedCard[prop] = deletedCard[prop];
    }
  });
  newCompletedCard.dept = "finishing";
  let completedCard = await FinishingBoardCompleted.create(newCompletedCard);
  let deleteSewingProduct = await AvailableProducts.findOneAndDelete({
    id: id,
    dept: "sewing",
  });
  let availableCard = await AvailableProducts.create(newCompletedCard);
  newCompletedCard.dept = "finishing";
  delete newCompletedCard._id;

  let performance = await PerformanceAnalyze.create(newCompletedCard);
  res.redirect("/finishing-board");
});

module.exports = router;
