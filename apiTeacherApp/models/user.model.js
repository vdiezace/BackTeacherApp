/*const getAllUser = () => {
  return db.query("select * from users");
};

module.exports = { getAllUser };*/
const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM users');
};

const getById = (userId) => {
    return db.query('SELECT * FROM users WHERE id = ?', [userId]);
};

const create = ({ role_id, username, password, email, first_name, last_name, created, updated }) => {
    return db.query('INSERT INTO users (role_id, username, password, email, first_name, last_name, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [role_id, username, password, email, first_name, last_name, created, updated]);
};

const update = (userId, { role_id, username, password, email, first_name, last_name, created, updated }) => {
    return db.query('UPDATE users SET role_id = ?, username = ?, password = ?, email = ?, first_name = ?, last_name = ?, created = ?, updated = ? WHERE id = ?', [role_id, username, password, email, first_name, last_name, created, updated, userId]);
};

const deleteById = (userId) => {
    return db.query('DELETE FROM users WHERE id = ?', [userId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};

