const { createLocation } = require("../models/location.model");
const { create, getById } = require("../models/student.model");
const { createUser } = require("../models/user.model");

const router = require("express").Router();

router.post("/student", async (req, res) => {
  //res.json("Creando un nuevo registro");
  try {
    /** Creamos una nueva localización */
    const [resultLocation] = await createLocation(req.body);
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

module.exports = router;
