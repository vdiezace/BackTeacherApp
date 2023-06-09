const getAllAdmins = () => {
  return db.query(
    "select * from users AS u inner join role AS r ON r.id = u.role_id where r.id = 1"
  );
};

const getAdmintById = (adminId) => {
  return db.query(
    "select * from users AS u inner join role AS r ON r.id = u.role_id WHERE r.id = 1 AND u.id = ?",
    [adminId]
  );
};

const createAdmin = ({
  role_id,
  username,
  email,
  password,
  first_name,
  last_name,
}) => {
  return db.query(
    "insert into users (role_id, username, email, password, first_name, last_name) values (?, ?, ?, ?, ?, ?)",
    [role_id, username, email, password, first_name, last_name]
  );
};

const updateAdmin = (
  adminId,
  { role_id, username, email, password, first_name, last_name }
) => {
  return db.query(
    "update users set role_id = ?, username = ?, email = ?, password = ?, first_name = ?, last_name = ? where id = ?",
    [role_id, username, email, password, first_name, last_name, adminId]
  );
};

const deleteAdminById = (adminId) => {
  return db.query(
    "delete u from users AS u INNER JOIN role AS r ON r.id = u.role_id WHERE r.id = 1 AND u.id = ?",
    [adminId]
  );
};

const deleteAllAdmins = () => {
  return db.query(
    "delete u from users AS u INNER JOIN role AS r ON r.id = u.role_id WHERE r.id = 1"
  );
};
module.exports = {
  getAllAdmins,
  getAdmintById,
  createAdmin,
  updateAdmin,
  deleteAdminById,
  deleteAllAdmins,
};
