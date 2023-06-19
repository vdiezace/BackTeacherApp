const { getTeacherClassesByTeacherId, getTeacherClassesByStudentId } = require("../../models/teacher.model");

const router = require("express").Router();

router.get("/:teacherId", async (req, res) => {
  const { teacherId } = req.params;
  try {
    const [teacherClassInfo] = await getTeacherClassesByTeacherId(teacherId);
    if (teacherClassInfo.length === 0) {
      return res.json({
        message:
          "No existe ninguna clase para el profesor con ID = " + teacherId,
      });
    }
    res.json(teacherClassInfo);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

router.get("/student/:studentId", async (req, res) => {
  const {studentId} = req.params;
  try{
    const [studentClassInfo] = await getTeacherClassesByStudentId(studentId);
    if(studentClassInfo.length === 0){
      return res.json({message: "No existe ninguna clase para el estudiante con ID = " + studentId,})
    }
    res.json(studentClassInfo);
  }catch(error){
    res.status(500).json({fatal: error.message})
  }
})

module.exports = router;
