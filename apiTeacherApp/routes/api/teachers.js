const router = require("express").Router();
const dayjs = require("dayjs");

const {
  createLocation,
  updateLocation,
} = require("../../models/location.model");
const {
  getTeacherClassHours,
  getTeacherByFilter,
  createTeacher,
  getTeacher,
  updateTeacher,
  validateTeacher,
  unvalidatedTeacher,
  getTeacherById,
  getAllTeachers,
} = require("../../models/teacher.model");
const {
  createUser,
  updateUser,
  deleteUser,
} = require("../../models/user.model");
const { getAvgReviewRatingByTeacher } = require("../../models/review.model");

/** GET all teachers */
router.get("/", async (req, res) => {
  //res.json("obteniendo todos los profesores");
  try {
    const [teachers] = await getAllTeachers();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET a teacher by ID con la puntuacion media*/
router.get("/:teacherId", async (req, res) => {
  //res.json("Obteniendo un teacher by ID");
  const { teacherId } = req.params;
  try {
    const [teacher] = await getTeacherById(teacherId);
    if (teacher.length === 0) {
      return res.json({
        message: "No existe el profesor con ID = " + teacherId,
      });
    }

    /** Añadimos su puntuación media */
    const [avgRating] = await getAvgReviewRatingByTeacher(teacherId);
    teacher[0].avg_rating = avgRating[0].avg_rating;
    res.json(teacher[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET teacher class hours */
router.get("/hours/:teacherId", async (req, res) => {
  //res.json("Devuelve las horas de un profesor");
  const { teacherId } = req.params;
  try {
    const [teacherClassHours] = await getTeacherClassHours(teacherId);
    if (teacher.length === 0) {
      return res.json({
        fatal: "No existe el profesor con ID = " + teacherId,
      });
    }
    res.json(teacherClassHours[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET teachers by Filters */
router.get("/filters/:filterId", async (req, res) => {
  //res.json("Aplicando filtros a los profesores");
  const { filterId } = req.params;
  const arrFilter = [
    "order by price_hour asc, experience desc",
    "order by category_id, price_hour asc, experience desc",
    "order by teacher_id",
  ];
  try {
    const filter = arrFilter[parseInt(filterId) - 1];
    if (!filter) {
      return res.json({ fatal: "No existe el filtro " + filterId });
    }
    const [teacherFiltered] = await getTeacherByFilter(filter);
    res.json(teacherFiltered[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** CREATE a new teacher */
router.post("/", async (req, res) => {
  //res.json("Creando un nuevo profesor");
  try {
    /** Creamos un nuevo usuario, obtenemos su id y lo guardamos en user_id */
    const [newUser] = await createUser(req.body);
    req.body.user_id = newUser.insertId;

    const [newLocation] = await createLocation(req.body);
    req.body.locations_id = newLocation.insertId;

    /** Creamos un nuevo estudiante y lo insertamos*/
    const [resultTeacher] = await createTeacher(req.body);
    const [newTeacher] = await getTeacherById(resultTeacher.insertId);
    res.json(newTeacher[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** UPDATE new teacher */
router.put("/:teacherId", async (req, res) => {
  //res.json("Actualizando un profesor");
  const { teacherId } = req.params;
  try {
    /** Obtenemos los datos del profe */
    const [teacher] = await getTeacher(teacherId);

    /** recogemos el id de la localizacion y del usuario */
    req.body.user_id = teacher[0].user_id;
    //res.json(req.body.user_id);
    req.body.locations_id = teacher[0].locations_id;

    /** actualizados los IDs de localizacion y usuario */
    await updateLocation(teacher[0].locations_id, req.body);
    await updateUser(teacher[0].user_id, req.body);

    /** actualizamos el profe */
    await updateTeacher(teacher[0].id, req.body);
    const [modifiedTeacher] = await getTeacherById(teacher[0].id);
    res.json(modifiedTeacher[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** UPDATE validate a teacher */
router.put("/validate/:teacherId", async (req, res) => {
  //res.json("validando a un profe");
  const { teacherId } = req.params;
  try {
    /** Se valida a un profe */
    const [teacherValidated] = await validateTeacher(teacherId);
    //res.json(teacherValidated.affectedRows);
    if (teacherValidated.affectedRows !== 1) {
      return res.json({
        error: "No se ha podido validar el profesor con ID = " + teacherId,
      });
    }

    /** recuperamos el profe */
    const [teacher] = await getTeacherById(teacherId);

    /** Se habilita en usuarios */
    const [user] = await deleteUser(teacher[0].user_id, null);
    //res.json(user.affectedRows);

    if (user.affectedRows !== 1) {
      return res.json({
        error:
          "Se ha validado el profesor cuyo ID es " +
          teacherId +
          "pero ha ocurrido un error al quitarlo de unsubscribe. Póngase en contacto con el administrador",
      });
    }
    res.json(teacher[0]);
  } catch (error) {
    res.status(400).json({
      fatal: "No se ha podido activar el estudiante cuyo ID es " + teacherId,
    });
  }
});

/** DELETE teacher by ID */
router.delete("/:teacherId", async (req, res) => {
  //res.json("Eliminando un profesor");
  const { teacherId } = req.params;
  try {
    const [teacher] = await getTeacherById(teacherId);

    if (teacher[0].unsubscribed_date !== null) {
      return res.json({
        error:
          "El profesor con ID = " +
          teacherId +
          " ha sido dado de baja el dia " +
          dayjs(teacher[0].unsubscribed_date).format("YYYY-MM-DD HH:mm:ss"),
      });
    }
    /** Fecha de baja */
    const unsubscribed_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    await deleteUser(teacher[0].user_id, unsubscribed_date);

    /** Profesor dado de baja*/
    await unvalidatedTeacher(teacher[0].user_id);
    teacher[0].unsubscribed_date = unsubscribed_date;
    res.json(teacher[0]);
  } catch (error) {
    res.status(500).json({
      fatal: "No se ha podido dar de baja al profesor cuyo ID es " + teacherId,
    });
  }
});

module.exports = router;
