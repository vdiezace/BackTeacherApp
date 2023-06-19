const router = require("express").Router();

const {
  getAllProvinces,
  getAllCities,
  getCitiesByProvince,
  getAllLocations,
  createLocation,
  getLocationById,
  updateLocation,
  deleteLocationById,
} = require("../models/location.model");

/** GET all locations */
router.get("/", async (req, res) => {
  try {
    const [locations] = await getAllLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET all provinces */
router.get("/province", async (req, res) => {
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
});

/** Obteniendo las ciudad a partir del ID de las provincias */
router.get("/province/city/:province_id", async (req, res) => {
  const { province_id } = req.params;
  try {
    const [city] = await getCitiesByProvince(province_id);
    if (city.length === 0) {
      return res.json({
        message:
          "No existe la ciudad con el ID de provincia igual a " + province_id,
      });
    }
    res.json(city);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** CREATE a locations */
router.post("/", async (req, res) => {
  try {
    const [result] = await createLocation(req.body);
    const [newLocation] = await getLocationById(result.insertId);
    res.json(newLocation[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** UPDATE a locations */
router.put("/:location_id", async (req, res) => {
  const { location_id } = req.params;
  try {
    await updateLocation(location_id, req.body);
    //res.json(result);
    const [location] = await getLocationById(location_id);
    if (location.legth === 0) {
      return res.json({
        message: "No existe la localización con ID = " + location_id,
      });
    }
    res.json(location[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** DELETE a location */
router.delete("/:location_id", async (req, res) => {
  const { location_id } = req.params;
  try {
    const [location] = await getLocationById(location_id);
    await deleteLocationById(location_id);
    if (location.length === 0) {
      return res.json({
        message: "No existe la localización con ID = " + location_id,
      });
    }
    res.json(location[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
