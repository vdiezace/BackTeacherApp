const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM categories');
};

const getById = (categoryId) => {
    return db.query('SELECT * FROM categories WHERE id = ?', [categoryId]);
};

const create = ({ title, description }) => {
    return db.query('INSERT INTO categories (title, description) VALUES (?, ?)', [title, description]);
};

const update = (categoryId, { title, description }) => {
    return db.query('UPDATE categories SET title = ?, description = ? WHERE id = ?', [title, description, categoryId]);
};

const deleteById = (categoryId) => {
    return db.query('DELETE FROM categories WHERE id = ?', [categoryId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};