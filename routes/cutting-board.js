const express = require("express");
const router = express.Router();
const path = require("path");
const cuttingBoard = require("../models/cuttingBoardTodo");
const CuttingBoardInProgress = require("../models/CuttingBoardInProgress");
const CuttingBoardCompleted = require("../models/CuttingBoardCompleted");
let sewingBoard = require("../models/SewingBoard");
let AvailableProducts = require("../models/AvailableProducts");

//Method = GET
//Route = /cutting-board
router.get("/", async (req, res) => {
  let cuttingData = await cuttingBoard.find({}).lean();
  let inProgress = await CuttingBoardInProgress.find({}).lean();
  let completed = await CuttingBoardCompleted.limit(5)
    .find({})
    .sort({ published: -1 })
    .lean();
  res.render(path.join(__dirname, "../", "/views/cutting-board"), {
    data: cuttingData,
    inProgress,
    completed,
  });
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let deletedCard = await cuttingBoard.findOneAndDelete({ id: id }).lean();
  let newInprogressCard = {};
  Object.keys(deletedCard).forEach(function (prop) {
    if (prop != "_id" || prop != "__v") {
      newInprogressCard[prop] = deletedCard[prop];
    }
  });
  let inProgressCard = await CuttingBoardInProgress.create(newInprogressCard);
  res.redirect("/cutting-board");
});

router.get("/completed/:id", async (req, res) => {
  let id = req.params.id;
  let deletedCard = await CuttingBoardInProgress.findOneAndDelete({
    id: id,
  }).lean();
  let newCompletedCard = {};
  Object.keys(deletedCard).forEach(function (prop) {
    if (prop != "_id" || prop != "__v") {
      newCompletedCard[prop] = deletedCard[prop];
    }
  });
  let completedCard = await CuttingBoardCompleted.create(newCompletedCard);
  let sewingCard = await sewingBoard.create(newCompletedCard);
  let deleteFabricAvailableProduct = await AvailableProducts.findOneAndDelete({
    id: id,
    dept: "fabric",
  });
  newCompletedCard.dept = "cutting";
  let availableCard = await AvailableProducts.create(newCompletedCard);
  res.redirect("/cutting-board");
});

module.exports = router;
