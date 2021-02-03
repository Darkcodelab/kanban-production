const express = require("express");
const router = express.Router();
const path = require("path");
const KanbanCard = require("../models/KanbanCard");
const FabricInspectionBoardInProgress = require("../models/FabricInspectionBoardInProgress");
const FabricInspectionBoardCompleted = require("../models/FabricInspectionBoardCompleted");
const cuttingBoardTodo = require("../models/cuttingBoardTodo");
let AvailableProducts = require("../models/AvailableProducts");
let PerformanceAnalyze = require("../models/PerformanceAnalyze");

//Method = GET
//Route = /fabric-inspection-board
router.get("/", async (req, res) => {
  let Kanbandata = await KanbanCard.find({}).lean().limit(5);
  let inProgressData = await FabricInspectionBoardInProgress.find({}).lean();
  let completedData = await FabricInspectionBoardCompleted.find({})
    .sort({ published: -1 })
    .limit(5)
    .lean();
  res.render(path.join(__dirname, "../", "/views/fabric-inspection-board"), {
    data: Kanbandata,
    inProgress: inProgressData,
    completed: completedData,
  });
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let deletedCard = await KanbanCard.findOneAndDelete({ id: id }).lean();
  console.log(deletedCard);
  let newInProgressCard = {};
  Object.keys(deletedCard).forEach(function (prop) {
    if (prop != "_id" || prop != "__v")
      newInProgressCard[prop] = deletedCard[prop];
  });
  let inProgressCard = await FabricInspectionBoardInProgress.create(
    newInProgressCard
  );
  res.redirect("/fabric-inspection-board");
});

router.get("/completed/:id", async (req, res) => {
  let id = req.params.id;
  let deletedCard = await FabricInspectionBoardInProgress.findOneAndDelete({
    id: id,
  }).lean();
  let newCompletedCard = {};
  Object.keys(deletedCard).forEach(function (prop) {
    if (prop != "_id" || prop != "__v")
      newCompletedCard[prop] = deletedCard[prop];
  });
  let completedCard = await FabricInspectionBoardCompleted.create(
    newCompletedCard
  );
  let cuttingCard = await cuttingBoardTodo.create(newCompletedCard);
  newCompletedCard.dept = "fabric";
  let availableCard = await AvailableProducts.create(newCompletedCard);
  delete newCompletedCard._id;
  let performance = await PerformanceAnalyze.create(newCompletedCard);

  res.redirect("/fabric-inspection-board");
});

module.exports = router;
