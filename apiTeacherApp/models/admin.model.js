const getAllAdmins = () => {
  return db.query(
    "select * from users AS u inner join role AS r ON r.id = u.role_id where r.id = 1"
  );
};

const getAdminById = (adminId) => {
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
const validateTeacherById = (teacherId, { is_approved }) => {
  return db.query("update teachers set is_approved = ? WHERE user_id = ?", [
    is_approved,
    teacherId,
  ]);
};
module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdminById,
  deleteAllAdmins,
  validateTeacherById,
};
