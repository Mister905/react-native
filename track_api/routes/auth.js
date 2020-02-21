const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @route POST /api/auth/register
// @desc User Registration
// @access  Public
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const new_user = new User({
      email
    });

    const salt = await bcrypt.genSalt(10);

    new_user.password = await bcrypt.hash(password, salt);

    await new_user.save();

    const token = jwt.sign({ user_id: new_user._id }, "MY_SECRET_KEY");

    res.send({ token });
  } catch (error) {
    res.status(422).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Login Failed" });
    }

    const is_match = await bcrypt.compare(password, user.password);

    if (!is_match) {
      return res.status(400).json({ error: "Login Failed" });
    }

    const payload = { user_id: user.id };

    jwt.sign(payload, "MY_SECRET_KEY", { expiresIn: "8h" }, (error, token) => {
      if (error) throw error;
      res.send({ token });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
