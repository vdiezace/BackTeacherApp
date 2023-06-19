const router = require("express").Router();
const { checkSchema } = require("express-validator");

const {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  deleteById,
  updateLocation,
} = require("../../models/user.model");
const {
  checkUser,
  checkEmail,
  newUserData,
} = require("../../utils/user.validator");
const { checkError } = require("../../utils/common.validator");

/** GET all users including ther roles & descriptions */
router.get("/", async (req, res) => {
  try {
    const [users] = await getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET a user by ID */
router.get("/:userId", checkUser, async (req, res) => {
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
router.get("/email/:userEmail", checkEmail, async (req, res) => {
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
router.post("/", checkSchema(newUserData), checkError, async (req, res) => {
  try {
    const [result] = await create(req.body);
    const [user] = await getById(result.insertId);
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** UPDATE a user by ID */
router.put("/:userId", checkUser, async (req, res) => {
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
router.delete("/:userId", checkUser, async (req, res) => {
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
router.put("/location/:userId", checkUser, async (req, res) => {
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
