const express = require("express");
const router = express.Router();

const { getAll, getById } = require("../../models/student.model");

/** GET All students */
router.get("/", async (req, res) => {
  //res.json("pasa por aqui");
  try {
    const [students] = await getAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET an students BY ID */
router.get("/:studentId", async (req, res) => {
  //res.json("Obtiendo un estudiante por su id");
  //res.json(req.params);
  const { studentId } = req.params;
  try {
    const [student] = await getById(studentId);
    if (student.length === 0) {
      return res.json({
        fatal: "No existe el estudiante con cuyo ID " + studentId,
      });
    }
    res.json(student[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
