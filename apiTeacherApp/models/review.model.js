const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM reviews');
};

const getById = (reviewId) => {
    return db.query('SELECT * FROM reviews WHERE id = ?', [reviewId]);
};

const create = ({ teacher_id, student_id, rating, comment, created_at, updated_at }) => {
    return db.query('INSERT INTO reviews (teacher_id, student_id, rating, comment, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)', [teacher_id, student_id, rating, comment, created_at, updated_at]);
};

const update = (reviewId, { teacher_id, student_id, rating, comment, created_at, updated_at }) => {
    return db.query('UPDATE reviews SET teacher_id = ?, student_id = ?, rating = ?, comment = ?, created_at = ?, updated_at = ? WHERE id = ?', [teacher_id, student_id, rating, comment, created_at, updated_at, reviewId]);
};

const deleteById = (reviewId) => {
    return db.query('DELETE FROM reviews WHERE id = ?', [reviewId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};
