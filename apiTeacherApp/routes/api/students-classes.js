const { getClassesByStudentId } = require("../../models/class.model");

const router = require("express").Router();

router.get("/:studentId", async (req, res) => {
  //res.json("Obteniendo las clases del estudiante");
  const { studentId } = req.params;
  try {
    const [classStudentInfo] = await getClassesByStudentId(studentId);
    if (classStudentInfo.length === 0) {
      return (
        res.json("No existe la clase para el estudiante con ID = ") + studentId
      );
    }
    res.json(classStudentInfo);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
