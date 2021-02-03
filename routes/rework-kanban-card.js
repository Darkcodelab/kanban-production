const router = require("express").Router();
let path = require("path");
let shortid = require("shortid");
let mongoose = require("mongoose");
const SewingBoard = require("../models/SewingBoard");

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../", "/views/rework-kanban-card"));
});

router.post("/", async (req, res) => {
  let newCard = {};
  Object.keys(req.body).forEach(function (prop) {
    newCard[prop] = req.body[prop];
  });
  newCard.id = shortid.generate();
  let card = await SewingBoard.create(newCard);

  res.redirect("/sewing-board");
});

module.exports = router;
