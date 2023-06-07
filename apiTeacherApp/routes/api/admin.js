const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("Obteniendo todos los administradores");
});

module.exports = router;
