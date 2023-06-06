const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM students');
};

const getById = (studentId) => {
    return db.query('SELECT * FROM students WHERE id = ?', [studentId]);
};

const create = ({ user_id, locations_id, phone, avatar }) => {
    return db.query('INSERT INTO students (user_id, locations_id, phone, avatar) VALUES (?, ?, ?, ?)', [user_id, locations_id, phone, avatar]);
};

const update = (studentId, { user_id, locations_id, phone, avatar }) => {
    return db.query('UPDATE students SET user_id = ?, locations_id = ?, phone = ?, avatar = ? WHERE id = ?', [user_id, locations_id, phone, avatar, studentId]);
};

const deleteById = (studentId) => {
    return db.query('DELETE FROM students WHERE id = ?', [studentId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};