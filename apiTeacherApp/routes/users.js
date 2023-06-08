const express = require("express");
const router = express.Router();
const bycript = require("bcryptjs");

const { getAllUser, getByEmail } = require("../models/user.model");
const { getIdStudentByUserId } = require("../models/student.model");
const { getIdTeacherByUsedId } = require("../models/teacher.model");

router.get("/", async (req, res) => {
  //res.send("Pasa por aqui");
  try {
    const [users] = await getAllUser();
    res.json(users);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

router.post("/login", async (req, res) => {
  //res.json("Log in de los usuarios");
  const { email, password } = req.body;
  try {
    /** Comprobamos que existe el correo en la BBDD */
    const [result] = await getByEmail(email);
    //res.json(user[0]);
    if (result.length === 0) {
      return res.json({ fatal: "El correo " + email + " no existe" });
    }
    /** recuperamos el usuario */
    const user = result[0];
    //res.json(user);
    /** Comprobamos que las constraseñas sean iguales */
    //res.json(user.password);
    const checkPssw = bycript.compare(password, user.password);
    if (!checkPssw) {
      return res.json({ fatal: "Error en email y/o contraseña" });
    }
    /** Login Success */
    let id;
    res_student = await getIdStudentByUserId(user.id);
    res_teacher = await getIdTeacherByUsedId(user.id);
    switch (user.role_id) {
      case 1:
        id = user.id;
        break;
      case 2:
        id = res_teacher.id;
        break;
      case 3:
        id = res_student.id;
        break;
    }

    res.json({ success: "Login correcto" });
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
