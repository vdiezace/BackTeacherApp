const router = require("express").Router();
const bcrypt = require("bcryptjs");

const {
  getAllAdmins,
  createAdmin,
  getAdmintById,
  updateAdmin,
  deleteAdminById,
  deleteAllAdmins,
} = require("../../models/admin.model");
const {
  validateTeacher,
  getTeacherById,
} = require("../../models/teacher.model");

/** GET all admins */
router.get("/", async (req, res) => {
  //res.json("Obteniendo todos los administradores");
  try {
    const [admins] = await getAllAdmins();
    res.json(admins[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET admin BY ID */
router.get("/:adminId", async (req, res) => {
  //res.json("Obteniendo un admin por su id");
  const { adminId } = req.params;
  try {
    const [admin] = await getById(adminId);
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
router.post("/", async (req, res) => {
  //res.json("Creando un nuevo admin");
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const [result] = await createAdmin(req.body);
    //res.json(result.insertId);
    const [newAdmin] = await getAdmintById(result.insertId);
    res.json(newAdmin[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** UPDATE an admin */
router.put("/:adminId", async (req, res) => {
  //res.json("actualizando un admin");
  const { adminId } = req.params;
  try {
    await updateAdmin(adminId, req.body);
    const [admin] = await getAdmintById(adminId);
    res.json(admin[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

router.delete("/:adminId", async (req, res) => {
  //res.json("Eliminando un admin");
  const { adminId } = req.params;
  try {
    const [admin] = await getAdmintById(adminId);
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
