const mongoose = require("mongoose");
const dbURI ="mongodb+srv://myshopuser:l0IlnvTAI2LFxfLt@myshop.kwc6clv.mongodb.net/gym";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
