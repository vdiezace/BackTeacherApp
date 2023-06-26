const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const bcrypt = require("bcryptjs");
const { checkSchema } = require("express-validator");

const {
  getAllStudents,
  getStudentById,
  createStudent,
  getStudent,
  updateStudent,
  getActiveStudent,
  getDeactiveStudent,
  activeStudent,
  deactiveStudent,
} = require("../../models/student.model");
const {
  createLocation,
  updateLocation,
} = require("../../models/location.model");
const {
  createUser,
  updateUser,
  deleteUser,
} = require("../../models/user.model");
const {
  checkStudent,
  newStudentData,
  checkEmptyFields,
  updateStudentData,
} = require("../../utils/student.validator");
const {
  checkError,
  checkCity,
  checkUser,
  checkRole,
} = require("../../utils/common.validator");
const { checkToken, checkTokenRole } = require("../../utils/middlewares");

/** GET All students */
router.get("/", async (req, res) => {
  try {
    const [students] = await getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET an students BY ID */
router.get("/:studentId", checkStudent, async (req, res) => {
  const { studentId } = req.params;
  try {
    const [student] = await getStudentById(studentId);
    if (student.length === 0) {
      return res.json({
        fatal: "No existe el estudiante con cuyo ID es " + studentId,
      });
    }
    res.json(student[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** CREATE a new student */
router.post(
  "/",
  checkSchema(newStudentData),
  checkError,
  checkCity,
  checkEmptyFields,
  async (req, res) => {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, 8);

      /** Creamos un nuevo usuario, obtenemos su id y lo guardamos en user_id */
      const [newUser] = await createUser(req.body);
      req.body.users_id = newUser.insertId;

      /** Creamos una nueva localización */
      const [newLocation] = await createLocation(req.body);
      /** Obtenemos el id y lo guardamos en locations_id */
      req.body.locations_id = newLocation.insertId;

      /** Creamos un nuevo estudiante y lo insertamos*/
      const [resultStudent] = await createStudent(req.body);
      const [newStudent] = await getStudentById(resultStudent.insertId);
      res.json(newStudent[0]);
    } catch (error) {
      res.status(500).json({ fatal: error.message });
    }
  }
);

/** UPDATE an student by ID */
router.put(
  "/:studentId",
  checkToken,
  checkStudent,
  checkSchema(updateStudentData),
  checkError,
  checkUser,
  checkRole,
  checkCity,
  checkEmptyFields,
  async (req, res) => {
    const { studentId } = req.params;
    try {
      req.body.password = bcrypt.hashSync(req.body.password, 8);
      /** Obtenemos los datos del estudiante */
      const [student] = await getStudent(studentId);
      /** recogemos el id de la localizacion y del usuario */
      //res.json(student)
      req.body.users_id = student[0].users_id;
      req.body.locations_id = student[0].locations_id;

      /** actualizados los IDs de localizacion y usuario */
      await updateLocation(student[0].locations_id, req.body);
      await updateUser(student[0].users_id, req.body);

      /** actualizamos el estudiante */
      await updateStudent(student[0].id, req.body);
      const [modifiedStudent] = await getStudentById(student[0].id);
      res.json(modifiedStudent[0]);
    } catch (error) {
      res.status(500).json({ fatal: error.message });
    }
  }
);

/** DELETE student by ID */
router.delete(
  "/:studentId",
  checkToken,
  checkTokenRole("admin"),
  checkStudent,
  async (req, res) => {
    //res.json("Eliminando un estudiante");
    const { studentId } = req.params;
    try {
      const [student] = await getStudentById(studentId);
      if (student[0].unsubscribed_date !== null) {
        return res.json({
          error:
            "El estudiante con ID = " +
            studentId +
            " ha sido dado de baja el dia " +
            dayjs(student[0].unsubscribed_date).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
      /** Fecha de baja */
      const unsubscribed_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
      await deleteUser(student[0].user_id, unsubscribed_date);

      /** desactiva el estudiante */
      await deactiveStudent(student[0].user_id);
      /** actualizamos el estudiante */
      student[0].unsubscribed_date = unsubscribed_date;
      res.json(student[0]);
    } catch (error) {
      res.status(500).json({
        fatal:
          "No se ha podido dar de baja al estudiante cuyo ID es " + studentId,
      });
    }
  }
);

/** GET active students */
router.get("/status/active", async (req, res) => {
  try {
    const [students] = await getActiveStudent();
    res.json(students);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET deactive students */
router.get("/status/deactive", async (req, res) => {
  try {
    const [students] = await getDeactiveStudent();
    res.json(students);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** Activating an student */
router.put("/:studentId/active", checkStudent, async (req, res) => {
  const { studentId } = req.params;
  try {
    /** Se activa el estudiante */
    const [studentActivated] = await activeStudent(studentId);
    if (studentActivated.affectedRows !== 1) {
      return res.json({
        error: "No se ha podido activar el estudiante cuyo ID es " + studentId,
      });
    }

    /** recuperamos el estudiante */
    const [student] = await getStudentById(studentId);

    /** Se habilita en usuarios */
    const [user] = await deleteUser(student[0].user_id, null);

    if (user.affectedRows !== 1) {
      return res.json({
        error:
          "Se ha activado el estudiante cuyo ID es " +
          studentId +
          "pero ha ocurrido un error al quitarlo de unsubscribe. Póngase en contacto con el administrador",
      });
    }
    res.json(student[0]);
  } catch (error) {
    res.status(400).json({
      fatal: "No se ha podido activar el estudiante cuyo ID es " + studentId,
    });
  }
});

module.exports = router;
