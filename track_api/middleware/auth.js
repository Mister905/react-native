const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = (req, res, next) => {
  // Express automatically lowercases header names
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, 'MY_SECRET_KEY', async (error, payload) => {
    if (error) {
      console.log(error);
      return res.status(401).send({ error: "Unauthorized" });
    }

    const { user_id } = payload;

    const user = await User.findById(user_id);

    req.user = user;

    next();
  });
};
