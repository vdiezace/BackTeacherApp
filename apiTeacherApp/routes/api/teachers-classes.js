const { getTeacherClassesByTeacherId } = require("../../models/teacher.model");

const router = require("express").Router();

router.get("/:teacherId", async (req, res) => {
  //res.json("obteniendo las clases de un profesor");
  const { teacherId } = req.params;
  try {
    const [teacherClassInfo] = await getTeacherClassesByTeacherId(teacherId);
    if (teacherClassInfo.length === 0) {
      return res.json({
        message:
          "No existe ninguna clase para el profesor con ID = " + teacherId,
      });
    }
    res.json(teacherClassInfo[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
