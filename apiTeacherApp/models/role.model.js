const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM role');
};

const getById = (roleId) => {
    return db.query('SELECT * FROM role WHERE id = ?', [roleId]);
};

const create = ({ title, description }) => {
    return db.query('INSERT INTO role (title, description) VALUES (?, ?)', [title, description]);
};

const update = (roleId, { title, description }) => {
    return db.query('UPDATE role SET title = ?, description = ? WHERE id = ?', [title, description, roleId]);
};

const deleteById = (roleId) => {
    return db.query('DELETE FROM role WHERE id = ?', [roleId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};