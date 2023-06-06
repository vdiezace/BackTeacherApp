const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM message');
};

const getById = (messageId) => {
    return db.query('SELECT * FROM message WHERE id = ?', [messageId]);
};

const create = ({ content }) => {
    return db.query('INSERT INTO message (content) VALUES (?)', [content]);
};

const update = (messageId, { content }) => {
    return db.query('UPDATE message SET content = ? WHERE id = ?', [content, messageId]);
};

const deleteById = (messageId) => {
    return db.query('DELETE FROM message WHERE id = ?', [messageId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};