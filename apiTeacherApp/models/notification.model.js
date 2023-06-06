const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM notifications');
};

const getById = (notificationId) => {
    return db.query('SELECT * FROM notifications WHERE id = ?', [notificationId]);
};

const create = ({ title, description, users_id }) => {
    return db.query('INSERT INTO notifications (title, description, users_id) VALUES (?, ?, ?)', [title, description, users_id]);
};

const update = (notificationId, { title, description, users_id }) => {
    return db.query('UPDATE notifications SET title = ?, description = ?, users_id = ? WHERE id = ?', [title, description, users_id, notificationId]);
};

const deleteById = (notificationId) => {
    return db.query('DELETE FROM notifications WHERE id = ?', [notificationId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};