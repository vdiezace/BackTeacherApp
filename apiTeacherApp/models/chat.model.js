const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM chat');
};

const getById = (chatId) => {
    return db.query('SELECT * FROM chat WHERE id = ?', [chatId]);
};

const create = ({ users_id, title, content }) => {
    return db.query('INSERT INTO chat (users_id, title, content) VALUES (?, ?, ?)', [users_id, title, content]);
};

const update = (chatId, { users_id, title, content }) => {
    return db.query('UPDATE chat SET users_id = ?, title = ?, content = ? WHERE id = ?', [users_id, title, content, chatId]);
};

const deleteById = (chatId) => {
    return db.query('DELETE FROM chat WHERE id = ?', [chatId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};
