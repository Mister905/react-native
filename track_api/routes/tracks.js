const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Track = require("../models/Track");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const tracks = await Track.find({ user_id: req.user._id });
  res.send(tracks);
});

router.post("/", auth, async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res.status(422).send({ error: "Name and Location are Required" });
  }

  try {
    const track = new Track({ name, locations, user_id: req.user._id });

    await track.save();

    res.send(track);
  } catch (error) {
    res.send(422).send({ error: error.message });
  }
});

module.exports = router;
