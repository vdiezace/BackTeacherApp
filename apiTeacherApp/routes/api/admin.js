const router = require("express").Router();
const bcrypt = require("bcryptjs");

const {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdminById,
  deleteAllAdmins,
  getAdminById,
} = require("../../models/admin.model");
const {
  validateTeacher,
  getTeacherById,
} = require("../../models/teacher.model");
const {
  checkAdmin,
  checkError,
  newAdmin,
} = require("../../utils/admin.validators");
const { checkSchema } = require("express-validator");

/** GET all admins */
router.get("/", checkAdmin, async (req, res) => {
  //res.json("Obteniendo todos los administradores");
  try {
    const [admins] = await getAllAdmins();
    res.json(admins[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET admin BY ID */
router.get("/:adminId", checkAdmin, async (req, res) => {
  //res.json("Obteniendo un admin por su id");
  const { adminId } = req.params;
  try {
    const [admin] = await getAdminById(adminId);
    if (admin.length === 0) {
      return res.json({
        fatal: "No existe el administrador con cuyo ID es " + adminId,
      });
    }
    res.json(admin[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** CREATE an admin */
router.post("/", checkSchema(newAdmin), checkError, async (req, res) => {
  //res.json("Creando un nuevo admin");
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const [result] = await createAdmin(req.body);
    //res.json(result.insertId);
    const [newAdmin] = await getAdminById(result.insertId);
    res.json(newAdmin[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** UPDATE an admin */
router.put("/:adminId", checkAdmin, async (req, res) => {
  //res.json("actualizando un admin");
  const { adminId } = req.params;
  try {
    await updateAdmin(adminId, req.body);
    const [admin] = await getAdminById(adminId);
    res.json(admin[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

router.delete("/:adminId", checkAdmin, async (req, res) => {
  //res.json("Eliminando un admin");
  const { adminId } = req.params;
  try {
    const [admin] = await getAdminById(adminId);
    await deleteAdminById(adminId);
    res.json(admin[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

router.delete("/", async (req, res) => {
  //res.json("Eliminando todos los admins");
  try {
    await deleteAllAdmins();
    res.json({ message: "No hay usuarios administradores" });
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** Validate a teacher */
router.put("/validate/:teacherId", async (req, res) => {
  //res.json("Validando un teacher por el admin");
  const { teacherId } = req.params;
  try {
    await validateTeacher(teacherId, req.body);
    const [teacher] = await getTeacherById(teacherId);
    if (teacher.length === 0) {
      return res.json({
        fatal: "No existe el profesor con el ID =" + teacherId,
      });
    }
    res.json({
      message:
        "Se ha cambiado el estado del profesor ha " + teacher[0].is_approved,
    });
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
