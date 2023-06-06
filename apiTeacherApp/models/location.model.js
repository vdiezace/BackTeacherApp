const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM locations');
};

const getById = (locationId) => {
    return db.query('SELECT * FROM locations WHERE id = ?', [locationId]);
};

const create = ({ city_id, latitude, longitude, address }) => {
    return db.query('INSERT INTO locations (city_id, latitude, longitude, address) VALUES (?, ?, ?, ?)', [city_id, latitude, longitude, address]);
};

const update = (locationId, { city_id, latitude, longitude, address }) => {
    return db.query('UPDATE locations SET city_id = ?, latitude = ?, longitude = ?, address = ? WHERE id = ?', [city_id, latitude, longitude, address, locationId]);
};

const deleteById = (locationId) => {
    return db.query('DELETE FROM locations WHERE id = ?', [locationId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};