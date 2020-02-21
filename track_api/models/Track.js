const mongoose = require("mongoose");

const PointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
});

const TrackSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    default: ""
  },
  locations: [PointSchema],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("tracks", TrackSchema);
