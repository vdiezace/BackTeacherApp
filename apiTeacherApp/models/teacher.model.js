const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM teachers');
};

const getById = (teacherId) => {
    return db.query('SELECT * FROM teachers WHERE id = ?', [teacherId]);
};

const create = ({ user_id, category_id, locations_id, price_hour, experience, is_approved, phone, subject }) => {
    return db.query('INSERT INTO teachers (user_id, category_id, locations_id, price_hour, experience, is_approved, phone, subject) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [user_id, category_id, locations_id, price_hour, experience, is_approved, phone, subject]);
};

const update = (teacherId, { user_id, category_id, locations_id, price_hour, experience, is_approved, phone, subject }) => {
    return db.query('UPDATE teachers SET user_id = ?, category_id = ?, locations_id = ?, price_hour = ?, experience = ?, is_approved = ?, phone = ?, subject = ? WHERE id = ?', [user_id, category_id, locations_id, price_hour, experience, is_approved, phone, subject, teacherId]);
};

const deleteById = (teacherId) => {
    return db.query('DELETE FROM teachers WHERE id = ?', [teacherId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};