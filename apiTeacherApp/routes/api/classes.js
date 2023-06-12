const router = require("express").Router();

const {
  getBookedClasses,
  getActiveBookedClasses,
  createClass,
} = require("../../models/class.model");

/*GET booked classes */
router.get("/:classId", async (req, res) => {
  //res.json("obteniendo los datos de una clase reservada");
  const { classId } = req.params;
  try {
    const [classData] = await getBookedClasses(classId);
    if (!classData) {
      return res
        .status(400)
        .json({ error: "No existe la clase reservada con ID = " + classId });
    }
    res.json(classData[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET clases reservadas por ID teacher y por fecha */
router.get("/teacher/teacher=:teacherId&date=:startDate", async (req, res) => {
  //res.json("obteniendo clases por ID profesor y clase");
  const { teacherId, startDate } = req.params;
  try {
    const [classData] = await getActiveBookedClasses(teacherId, startDate);
    if (!classData) {
      res.status(400).json({
        error:
          "No existen las clases reservadas para el profesor con ID = " +
          teacherId +
          " para la fecha " +
          startDate,
      });
    }
    res.json(classData[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

router.post("/", async (req, res) => {
  //res.json("creando una nueva clase");
  try {
    /* Añadimos la hora a la que termina la clase */
    req.body.end_hour = parseInt(req.body.start_hour) + 1;

    const [result] = await createClass(req.body);
    const [newClass] = await getBookedClasses(result.insertId);
    res.json(newClass[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
