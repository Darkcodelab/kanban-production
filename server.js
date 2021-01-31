//Environmental Variables
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//Express
const express = require("express");
const app = express();

//MongoDB connection
let mongoose = require("mongoose");
const connectDB = require("./config/db");
// connectDB();

//Setting the view engine
app.set("view engine", "ejs");

//Express Middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/", require("./routes/index"));
app.use("/production-kanban-card", require("./routes/production-kanban-card"));
app.use(
  "/fabric-inspection-board",
  require("./routes/fabric-inspection-board")
);
app.use("/cutting-board", require("./routes/cutting-board"));
app.use("/sewing-board", require("./routes/sewing-board"));
app.use("/available-products", require("./routes/available-products"));

app.listen(PORT, console.log(`Server running on PORT: ${PORT}`));
