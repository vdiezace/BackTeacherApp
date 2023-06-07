const { getAll } = require("../models/student.model");

const router = require("express").Router();

router.get("/", async (req, res) => {
  //res.json("pasa por aqui");
  try {
    const [categories] = await getAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
