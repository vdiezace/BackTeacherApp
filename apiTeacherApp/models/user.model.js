/**** USER QUERIES to use in other classes */
const getAllUser = () => {
  return db.query("select * from users");
};

const getUserById = (userId) => {
  return db.query("select * from users where id = ?", [userId]);
};

const getRoleById = (roleId) => {
  return db.query("select * from role where id = ?", [roleId]);
};

const getUserByEmail = (email) => {
  return db.query("SELECT * FROM users where email = ?", [email]);
};

const createUser = ({
  role_id,
  username,
  email,
  password,
  first_name,
  last_name,
}) => {
  return db.query(
    "INSERT INTO users (role_id, username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)",
    [role_id, username, email, password, first_name, last_name]
  );
};

const updateUser = (
  userId,
  { first_name, last_name, username, email, password, role_id }
) => {
  return db.query(
    "UPDATE users SET role_id = ?, username = ?, email = ?, password = ?, first_name = ?, last_name = ? WHERE id = ?",
    [role_id, username, email, password, first_name, last_name, userId]
  );
};

const deleteUser = (userId, unsubscribed_date) => {
  return db.query("UPDATE users SET unsubscribed = ? WHERE id = ?", [
    unsubscribed_date,
    userId,
  ]);
};

/***** API User QUERIES ****/
const getAll = () => {
  return db.query(
    "select * from users AS u inner join role as r on r.id = u.role_id"
  );
};

const getById = (userId) => {
  return db.query(
    "SELECT u.id AS users_id, DATE_FORMAT(subscribed, '%d/%m/%Y %H:%i') as subscribed_date, DATE_FORMAT(unsubscribed, '%d/%m/%Y %H:%i') as unsubscribed_date, first_name, last_name, username, email, password, role_id, title, description FROM users AS u INNER JOIN role AS r ON r.id = u.role_id WHERE u.id = ?",
    [userId]
  );
};

const getByEmail = (userEmail) => {
  return db.query(
    "select u.*, r.title, r.description from users as u inner join role AS r ON r.id = u.role_id WHERE u.email = ?",
    [userEmail]
  );
};

const create = ({
  role_id,
  username,
  email,
  password,
  first_name,
  last_name,
}) => {
  return db.query(
    "INSERT INTO users (role_id, username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)",
    [role_id, username, email, password, first_name, last_name]
  );
};

const update = (
  userId,
  { first_name, last_name, username, email, password, role_id }
) => {
  return db.query(
    "UPDATE users SET role_id = ?, username = ?, email = ?, password = ?, first_name = ?, last_name = ? WHERE id = ?",
    [role_id, username, email, password, first_name, last_name, userId]
  );
};

const deleteById = (userId) => {
  return db.query("DELETE * FROM users WHERE id = ?", [userId]);
};

const updateLocation = (userId, { role, latitude, longitude }) => {
  return db.query(
    "UPDATE users AS u INNER JOIN " +
      role +
      "s AS r ON r.users_id = u.id INNER JOIN locations AS l ON l.id = r.locations_id SET latitude = ?, longitude = ? WHERE u.id = ?",
    [latitude, longitude, userId]
  );
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  deleteById,
  updateLocation,
  getAllUser,
  getUserByEmail,
  getUserById,
  getRoleById,
  createUser,
  updateUser,
  deleteUser,
};
