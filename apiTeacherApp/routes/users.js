const express = require("express");
const { getAllUser } = require("../models/user.model");
const router = express.Router();

router.get("/", async (req, res) => {
  //res.send("Pasa por aqui");
  try {
    const [users] = await getAllUser();
    res.json(users);
  } catch (error) {
    res.status(500).jsin({ fatal: message.error });
  }
});

module.exports = router;
