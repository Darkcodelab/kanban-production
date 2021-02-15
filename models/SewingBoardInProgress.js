const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SewingBoardCompletedSchema = new Schema(
  {
    customer: {
      type: String,
    },
    supplier: {
      type: String,
    },
    linenumber: {
      type: String,
    },
    stylenumber: {
      type: String,
    },
    colour: {
      type: String,
    },
    size: {
      type: String,
    },
    date: {
      type: String,
    },
    requireddate: {
      type: String,
    },
    quantity: {
      type: String,
    },
    id: {
      type: String,
    },
    startedAt: {
      type: String,
      default: new Date().toLocaleString(undefined, {
        timeZone: "Asia/Kolkata",
      }),
    },
  },

  { strict: false }
);

module.exports = mongoose.model(
  "SewingBoardCompleted",
  SewingBoardCompletedSchema
);
