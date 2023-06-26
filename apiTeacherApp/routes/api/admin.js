const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { checkSchema } = require("express-validator");

const {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdminById,
  deleteAllAdmins,
  getAdminById,
  validateTeacherById,
  deactiveStudentById,
} = require("../../models/admin.model");

const { getTeacherById } = require("../../models/teacher.model");

const {
  newAdminData,
  checkAdmin,
  updateAdminData,
} = require("../../utils/admin.validator");
const { checkTeacher } = require("../../utils/user.validator");
const { checkError } = require("../../utils/common.validator");
const { checkStudent } = require("../../utils/student.validator");
const { getStudentById } = require("../../models/student.model");

/** GET all admins */
router.get("/", async (req, res) => {
  try {
    const [admins] = await getAllAdmins();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET admin BY ID */
router.get("/:adminId", checkAdmin, async (req, res) => {
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
router.post("/", checkSchema(newAdminData), checkError, async (req, res) => {
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
router.put(
  "/:adminId",
  checkAdmin,
  checkSchema(updateAdminData),
  async (req, res) => {
    //res.json("actualizando un admin");
    const { adminId } = req.params;
    try {
      await updateAdmin(adminId, req.body);
      const [admin] = await getAdminById(adminId);
      res.json(admin[0]);
    } catch (error) {
      res.status(500).json({ fatal: error.message });
    }
  }
);

router.delete("/:adminId", checkAdmin, async (req, res) => {
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
  try {
    await deleteAllAdmins();
    res.json({ message: "No hay usuarios administradores" });
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** Validate a teacher */
router.put("/validate/:teacherId", checkTeacher, async (req, res) => {
  const { teacherId } = req.params;
  try {
    await validateTeacherById(teacherId, req.body);
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

/** Deactive a student */
router.put("/deactive/:studentId", checkStudent, async (req, res) => {
  const { studentId } = req.params;
  try {
    await deactiveStudentById(studentId, req.body);
    const [student] = await getStudentById(studentId);
    if (student.length === 0) {
      return res.json({
        fatal: "No existe el estudiante con el ID =" + studentId,
      });
    }
    res.json({
      message:
        "Se ha cambiado el estado del estudiante ha " + student[0].is_active,
    });
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
