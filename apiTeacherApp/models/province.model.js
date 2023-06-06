const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM province');
};

const getById = (provinceId) => {
    return db.query('SELECT * FROM province WHERE id = ?', [provinceId]);
};

const create = ({ name }) => {
    return db.query('INSERT INTO province (name) VALUES (?)', [name]);
};

const update = (provinceId, { name }) => {
    return db.query('UPDATE province SET name = ? WHERE id = ?', [name, provinceId]);
};

const deleteById = (provinceId) => {
    return db.query('DELETE FROM province WHERE id = ?', [provinceId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};