const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SewingBoardSchema = new Schema(
  {
    customer: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    linenumber: {
      type: String,
      required: true,
    },
    stylenumber: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    requireddate: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("SewingBoard", SewingBoardSchema);
