const router = require("express").Router();

const {
  getAll,
  getAllProvinces,
  getAllCities,
  getCitiesByProvince,
  create,
  getById,
  update,
  deleteById,
} = require("../models/location.model");

/** GET all locations */
router.get("/", async (req, res) => {
  //res.send("pasa por aqui");
  try {
    const [locations] = await getAll();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET all provinces */
router.get("/province", async (req, res) => {
  //res.send("pasa por aqui 2");
  try {
    const [provinces] = await getAllProvinces();
    res.json(provinces);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET all cities */
router.get("/city", async (req, res) => {
  try {
    const [cities] = await getAllCities();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
  //res.send("pasa por aqui 3");
});

/** Obteniendo las ciudad a partir del ID de las provincias */
router.get("/province/city/:province_id", async (req, res) => {
  //res.send("pasa por aqui 4");
  const { province_id } = req.params;
  //res.json(province_id);
  try {
    const [city] = await getCitiesByProvince(province_id);
    res.json(city);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** CREATE a locations */
router.post("/", async (req, res) => {
  //res.json("Se crea una nueva localizacion");
  try {
    const [result] = await create(req.body);
    //res.json(result);
    const [newLocation] = await getById(result.insertId);
    res.json(newLocation[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** UPDATE a locations */
router.put("/:location_id", async (req, res) => {
  //res.json("Se actualiza una localizacion");
  //res.json(req.params);
  const { location_id } = req.params;
  //console.log(location_id);
  try {
    await update(location_id, req.body);
    //res.json(result);
    const [location] = await getById(location_id);
    res.json(location[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** DELETE a location */
router.delete("/:location_id", async (req, res) => {
  //res.json("Se elimina una localizacion");
  const { location_id } = req.params;
  try {
    const [location] = await getById(location_id);
    await deleteById(location_id);
    res.json(location[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
