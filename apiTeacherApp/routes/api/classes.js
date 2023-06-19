const router = require("express").Router();
const { checkSchema } = require("express-validator");

const {
  getBookedClasses,
  getActiveBookedClasses,
  createClass,
  deleteClassById,
  getClassById,
} = require("../../models/class.model");
const { newBookingData } = require("../../utils/class.validator");
const { checkError } = require("../../utils/common.validator");
const { checkTeacher } = require("../../utils/teacher.validator");
const { checkStudent } = require("../../utils/student.validator");

/*GET booked classes */
router.get("/:classId", async (req, res) => {
  const { classId } = req.params;
  try {
    const [classInfo] = await getBookedClasses(classId);
    if (classInfo.length === 0) {
      return res
        .status(400)
        .json({ message: "No existe la clase reservada con ID = " + classId });
    }
    res.json(classInfo[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET clases reservadas por ID teacher y por fecha */
router.get("/teacher/teacher=:teacherId&date=:startDate", async (req, res) => {
  const { teacherId, startDate } = req.params;
  try {
    const [classInfo] = await getActiveBookedClasses(teacherId, startDate);
    if (classInfo.length === 0) {
      return res.status(400).json({
        message:
          "No existen clases reservadas con el profesor cuyo ID = " +
          teacherId +
          " para la fecha " +
          startDate,
      });
    }
    res.json(classInfo);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/* CREATE new class */
router.post(
  "/",
  checkSchema(newBookingData),
  checkError,
  checkTeacher,
  checkStudent,
  async (req, res) => {
    try {
      /* Añadimos la hora a la que termina la clase */
      req.body.end_hour = parseInt(req.body.start_hour) + 1;

      const [result] = await createClass(req.body);
      const [newClass] = await getBookedClasses(result.insertId);
      res.json(newClass[0]);
    } catch (error) {
      res.status(500).json({ fatal: error.message });
    }
  }
);

router.delete("/:classId",async (req, res)=> {
  const {classId} = req.params;
  try{
    const [result] = await getClassById(classId);
    await deleteClassById(classId);
    if (result.length === 0) {
      return res.json({
        fatal: "No existe la clase con cuyo ID es " + classId,
      });
    }
    res.json(result[0]);
  }catch(error){
    res.status(500).json({fatal: error.message})
  }
})

module.exports = router;
