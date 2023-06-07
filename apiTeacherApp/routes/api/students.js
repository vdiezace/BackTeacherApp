const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");

const {
  getAll,
  getById,
  create,
  get,
  update,
  deactive,
  getActive,
  getDeactive,
  active,
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
        fatal: "No existe el estudiante con cuyo ID es " + studentId,
      });
    }
    res.json(student[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** CREATE a new student */
router.post("/", async (req, res) => {
  //res.json("Creando un nuevo estudiante");
  try {
    /** Creamos una nueva localización */
    const [resultLocation] = await createLocation(req.body);
    //res.json(resultLocation);
    //res.json(req.body.locations_id);
    //res.json(resultLocation.insertId);

    /** Obtenemos el id y lo guardamos en locations_id */
    req.body.locations_id = resultLocation.insertId;

    /** Creamos un nuevo usuario, obtenemos su id y lo guardamos en user_id */
    const [resultUser] = await createUser(req.body);
    req.body.user_id = resultUser.insertId;

    /** Creamos un nuevo estudiante y lo insertamos*/
    const [resultStudent] = await create(req.body);
    const [newStudent] = await getById(resultStudent.insertId);
    res.json(newStudent[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** UPDATE an student by ID */
router.put("/:studentId", async (req, res) => {
  //res.json("actualizando un estudiante");
  const { studentId } = req.params;
  try {
    /** Obtenemos los datos del estudiante */
    const [student] = await get(studentId);
    //res.json(student);
    //res.json(student[0].user_id);

    /** recogemos el id de la localizacion y del usuario */
    req.body.user_id = student[0].user_id;
    //res.json(req.body.user_id);
    req.body.locations_id = student[0].locations_id;

    /** actualizados los IDs de localizacion y usuario */
    await updateLocation(student[0].locations_id, req.body);
    await updateUser(student[0].user_id, req.body);

    /** actualizamos el estudiante */
    await update(student[0].id, req.body);
    const [modifiedStudent] = await getById(student[0].id);
    res.json(modifiedStudent[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** DELETE student by ID */
router.delete("/:studentId", async (req, res) => {
  //res.json("Eliminando un estudiante");
  const { studentId } = req.params;
  try {
    const [student] = await getById(studentId);
    //res.json(student);
    //res.json(student[0].unsubscribed_date);
    if (student[0].unsubscribed_date !== null) {
      return res.json({
        error:
          "El estudiante " +
          studentId +
          " ha sido dado de baja el dia " +
          student[0].unsubscribed_date,
      });
    }
    /** Fecha de baja */
    const unsubscribed_date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    await deleteUser(student[0].user_id, unsubscribed_date);
    //res.json(student[0].user_id);

    /** desactiva el estudiante */
    const [resultStudent] = await deactive(student[0].user_id);
    /** actualizamos el estudiante */
    const [deactiveStudent] = await getById(resultStudent);
    res.json(deactiveStudent[0]);
  } catch (error) {
    res.status(500).json({
      fatal:
        "No se ha podido dar de baja al estudiante cuyo ID es " + studentId,
    });
  }
});

/** GET active students */
router.get("/status/active", async (req, res) => {
  //res.json("obteniendo los estudiantes activos");
  try {
    const [students] = await getActive();
    res.json(students);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET deactive students */
router.get("/status/deactive", async (req, res) => {
  //res.json("obteniendo los estudiantes activos");
  try {
    const [students] = await getDeactive();
    res.json(students);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** Activating an student */
router.put("/:studentId/active", async (req, res) => {
  //res.json("Cambiando el estado de un estudiante");
  const { studentId } = req.params;
  try {
    /** Se activa el estudiante */
    const [studentActivated] = await active(studentId);
    //res.json(studentActivated.affectedRows);
    if (studentActivated.affectedRows !== 1) {
      return res.json({
        error: "No se ha podido activar el estudiante cuyo ID es " + studentId,
      });
    }

    /** recuperamos el estudiante */
    const [student] = await getById(studentId);
    //res.json(student[0].user_id);

    /** Se habilita en usuarios */
    const [user] = await deleteUser(student[0].user_id, null);
    //res.json(user.affectedRows);

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
