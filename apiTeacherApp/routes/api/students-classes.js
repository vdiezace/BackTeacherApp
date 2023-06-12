const { getClassesByStudentId } = require("../../models/class.model");

const router = require("express").Router();

router.get("/:studentId", async (req, res) => {
  //res.json("Obteniendo las clases del estudiante");
  const { studentId } = req.params;
  try {
    const [classInfo] = await getClassesByStudentId(studentId);
    if (classInfo.length === 0) {
      return (
        res.json("No existe la clase para el estudiante con ID = ") + studentId
      );
    }
    res.json(classInfo[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
