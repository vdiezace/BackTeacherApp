const getAllLocations = () => {
  return db.query("SELECT * FROM locations");
};

const getLocationById = (locationId) => {
  return db.query("SELECT * FROM locations WHERE id = ?", [locationId]);
};

const getAllCities = () => {
  return db.query("SELECT * FROM city");
};

const getAllProvinces = () => {
  return db.query("SELECT * FROM province");
};

const getCityById = (cityId) => {
  return db.query("SELECT * FROM city WHERE id = ?", [cityId]);
};

const getCitiesByProvince = (province_id) => {
  return db.query("select * from city where province_id = ?", [province_id]);
};

const deleteLocationById = (locationId) => {
  return db.query("DELETE FROM locations WHERE id = ?", [locationId]);
};

/** Queries to use in teachers & students classes*/
const createLocation = ({ city_id, latitude, longitude, address }) => {
  return db.query(
    "INSERT INTO locations (city_id, latitude, longitude, address) VALUES (?, ?, ?, ?)",
    [city_id, latitude, longitude, address]
  );
};

const updateLocation = (
  location_id,
  { city_id, latitude, longitude, address }
) => {
  return db.query(
    "UPDATE locations SET city_id = ?, latitude = ?, longitude = ?, address = ? WHERE id = ?",
    [city_id, latitude, longitude, address, location_id]
  );
};

module.exports = {
  getAllLocations,
  getLocationById,
  getAllCities,
  getAllProvinces,
  getCityById,
  getCitiesByProvince,
  deleteLocationById,
  createLocation,
  updateLocation,
};
