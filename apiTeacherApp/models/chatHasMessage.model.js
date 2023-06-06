const db = require('../db');

const getAll = () => {
    return db.query('SELECT * FROM chat_has_message');
};

const getById = (chatHasMessageId) => {
    return db.query('SELECT * FROM chat_has_message WHERE id = ?', [chatHasMessageId]);
};

const create = ({ chat_id, message_id }) => {
    return db.query('INSERT INTO chat_has_message (chat_id, message_id) VALUES (?, ?)', [chat_id, message_id]);
};

const update = (chatHasMessageId, { chat_id, message_id }) => {
    return db.query('UPDATE chat_has_message SET chat_id = ?, message_id = ? WHERE id = ?', [chat_id, message_id, chatHasMessageId]);
};

const deleteById = (chatHasMessageId) => {
    return db.query('DELETE FROM chat_has_message WHERE id = ?', [chatHasMessageId]);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
};