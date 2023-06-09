const router = require("express").Router();

const {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  deleteById,
  updateLocation,
} = require("../../models/user.model");

/** GET all users including ther roles & descriptions */
router.get("/", async (req, res) => {
  //res.json("Pasa por aqui");
  try {
    const [users] = await getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET a user by ID */
router.get("/:userId", async (req, res) => {
  //res.json("obteniendo un usuario por ID");
  //res.json(req.params);
  const { userId } = req.params;
  try {
    const [result] = await getById(userId);
    if (result.length === 0) {
      return res.json({
        fatal: "No existe el usuario con cuyo ID es " + userId,
      });
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET a user by email */
router.get("/email/:userEmail", async (req, res) => {
  //res.json("Obteniendo un usuario por su email");
  const { userEmail } = req.params;
  try {
    const [user] = await getByEmail(userEmail);
    if (user.length === 0) {
      return res.json({
        fatal: "No existe el usuario con el correo " + userEmail,
      });
    }
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** CREATE a new user */
router.post("/", async (req, res) => {
  //res.json("creando un nuevo usuario");
  try {
    const [result] = await create(req.body);
    const [user] = await getById(result.insertId);
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** UPDATE a user by ID */
router.put("/:userId", async (req, res) => {
  //res.json("Actualizando un usuario");
  //res.json(req.params);
  const { userId } = req.params;
  try {
    await update(userId, req.body);
    const [result] = await getById(userId);
    if (result.length === 0) {
      return res.json({
        fatal: "No existe el usuario con cuyo ID es " + userId,
      });
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** DELETE a user by ID */
router.delete("/:userId", async (req, res) => {
  //res.json("Eliminando un usuario");
  const { userId } = req.params;
  try {
    const [result] = await getById(userId);
    await deleteById(userId);
    if (result.length === 0) {
      return res.json({
        fatal: "No existe el usuario con cuyo ID es " + userId,
      });
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** UPDATE a user location  */
router.put("/location/:userId", async (req, res) => {
  //res.json("Actualizando la localizacion");
  const { userId } = req.params;
  try {
    await updateLocation(userId, req.body);
    const [result] = await getById(userId);
    if (result.length === 0) {
      return res.json({
        fatal: "No existe el usuario con cuyo ID es " + userId,
      });
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
