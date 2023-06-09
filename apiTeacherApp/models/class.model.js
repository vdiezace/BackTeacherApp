const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM classes');
};

const getById = (classId) => {
    return db.query('SELECT * FROM classes WHERE id = ?', [classId]);
};

const create = ({ teachers_id, students_id, creation, title, start_hour, end_hour, start_date, cancel_date }) => {
    return db.query('INSERT INTO classes (teachers_id, students_id, creation, title, start_hour, end_hour, start_date, cancel_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [teachers_id, students_id, creation, title, start_hour, end_hour, start_date, cancel_date]);
};

const update = (classId, { teachers_id, students_id, creation, title, start_hour, end_hour, start_date, cancel_date }) => {
    return db.query('UPDATE classes SET teachers_id = ?, students_id = ?, creation = ?, title = ?, start_hour = ?, end_hour = ?, start_date = ?, cancel_date = ? WHERE id = ?', [teachers_id, students_id, creation, title, start_hour, end_hour, start_date, cancel_date, classId]);
};

const deleteById = (classId) => {
    return db.query('DELETE FROM classes WHERE id = ?', [classId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};