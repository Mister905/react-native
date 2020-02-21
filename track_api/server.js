const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const app = express();
app.use(express.json());

const mongo_uri =
  "mongodb+srv://Mister_905:Cx3vEgb1KkKLDvRq@cluster0-lm34a.mongodb.net/tracks?retryWrites=true&w=majority";

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", error => {
  console.log(error);
});

// ROUTES
const auth = require("./routes/auth");
app.use("/api/auth", auth);
const tracks = require("./routes/tracks");
app.use("/api/tracks", tracks);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
