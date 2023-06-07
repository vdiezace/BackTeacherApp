const router = require("express").Router();

const {
  getAll,
  getById,
  create,
  update,
  deleteById,
  deleteAll,
} = require("../../models/admin.model");

/** GET all admins */
router.get("/", async (req, res) => {
  //res.json("Obteniendo todos los administradores");
  try {
    const [admins] = await getAll();
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
    const [result] = await create(req.body);
    //res.json(result.insertId);
    const [newAdmin] = await getById(result.insertId);
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
    await update(adminId, req.body);
    const [admin] = await getById(adminId);
    res.json(admin[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

router.delete("/:adminId", async (req, res) => {
  //res.json("Eliminando un admin");
  const { adminId } = req.params;
  try {
    const [admin] = await getById(adminId);
    await deleteById(adminId);
    res.json(admin[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

router.delete("/", async (req, res) => {
  //res.json("Eliminando todos los admins");
  try {
    await deleteAll();
    res.json({ message: "No hay usuarios administradores" });
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
