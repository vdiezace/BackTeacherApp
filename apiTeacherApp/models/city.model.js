const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM city');
};

const getById = (cityId) => {
    return db.query('SELECT * FROM city WHERE id = ?', [cityId]);
};

const create = ({ province_id, name }) => {
    return db.query('INSERT INTO city (province_id, name) VALUES (?, ?)', [province_id, name]);
};

const update = (cityId, { province_id, name }) => {
    return db.query('UPDATE city SET province_id = ?, name = ? WHERE id = ?', [province_id, name, cityId]);
};

const deleteById = (cityId) => {
    return db.query('DELETE FROM city WHERE id = ?', [cityId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};