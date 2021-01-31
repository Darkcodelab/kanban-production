const express = require("express");
const router = express.Router();
const path = require("path");
let shortid = require("shortid");
let mongoose = require("mongoose");
let KanbanCard = require("../models/KanbanCard");

//Method - 'GET'
//route - /production-kanban-card
router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../", "/views/production-kanban-card"));
});

//Method - 'POST
//Route - /production-kanban-card
router.post("/", async (req, res) => {
  let newCard = {
    customer: req.body.customer,
    supplier: req.body.supplier,
    linenumber: req.body.linenumber,
    stylenumber: req.body.stylenumber,
    colour: req.body.colour,
    size: req.body.size,
    date: req.body.date,
    requireddate: req.body.requireddate,
    quantity: req.body.quantity,
    id: shortid.generate(),
  };
  let card = await KanbanCard.create(newCard);
  res.send("GOT A POST REQ");
});

module.exports = router;
