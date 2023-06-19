const router = require("express").Router();
const bcrypt = require("bcryptjs");

const { createLocation } = require("../models/location.model");
const { createStudent, getStudentById } = require("../models/student.model");
const { createUser } = require("../models/user.model");
const { createTeacher, getTeacherById } = require("../models/teacher.model");

router.post("/student", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    /** Creamos una nueva localización */
    const [resultLocation] = await createLocation(req.body);
    /** Obtenemos el id y lo guardamos en locations_id */
    req.body.locations_id = resultLocation.insertId;

    /** Creamos un nuevo usuario, obtenemos su id y lo guardamos en user_id */
    const [resultUser] = await createUser(req.body);
    req.body.user_id = resultUser.insertId;

    /** Creamos un nuevo estudiante y lo insertamos*/
    const [resultStudent] = await createStudent(req.body);
    const [newStudent] = await getStudentById(resultStudent.insertId);
    res.json(newStudent[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

router.post("/teacher", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    /** Creamos una nueva localización */
    const [resultLocation] = await createLocation(req.body);
    /** Obtenemos el id y lo guardamos en locations_id */
    req.body.locations_id = resultLocation.insertId;

    /** Creamos un nuevo usuario, obtenemos su id y lo guardamos en user_id */
    const [resultUser] = await createUser(req.body);
    req.body.user_id = resultUser.insertId;

    /** Creamos un nuevo estudiante y lo insertamos*/
    const [resultTeacher] = await createTeacher(req.body);
    const [newTeacher] = await getTeacherById(resultTeacher.insertId);
    res.json(newTeacher[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
