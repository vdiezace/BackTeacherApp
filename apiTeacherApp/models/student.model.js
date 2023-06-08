/** QUERY por el que se obtiene toda la información de los estudiantes
 * incluyendo su nombre, apellidos, email, contraseña, rol, fecha de creacion y de actualizacion
 * localizacion: latitud, longitud, provincia, ciudad y calle */
const sqlGetAllStudents =
  "SELECT s.id, s.is_active, s.phone, s.avatar, DATE_FORMAT(u.subscribed, '%d/%m/%Y %H:%i') as subscribed_date," +
  "DATE_FORMAT(u.unsubscribed, '%d/%m/%Y %H:%i') as unsubscribed_date, u.id as user_id, u.first_name," +
  "u.last_name, u.username ,u.email, u.password, l.latitude, l.longitude, l.address, c.name as city," +
  "p.name as province, r.title as role FROM students as s JOIN users as u ON " +
  "s.user_id = u.id JOIN locations as l ON s.locations_id = l.id JOIN city as c ON " +
  "l.city_id = c.id JOIN province as p ON c.province_id = p.id JOIN role as r ON u.role_id = r.id";

/** QUERY por el que se obtiene toda la información de un único estudiante
 * incluyendo su nombre, apellidos, email, contraseña, rol, fecha de creacion y de actualizacion
 * localizacion: latitud, longitud, provincia, ciudad y calle */
const sqlGetStudentById =
  "SELECT s.id, s.is_active, s.phone, s.avatar, DATE_FORMAT(u.subscribed, '%d/%m/%Y %H:%i') as subscribed_date," +
  "DATE_FORMAT(u.unsubscribed, '%d/%m/%Y %H:%i') as unsubscribed_date, u.id as user_id, u.first_name, " +
  "u.last_name, u.username, u.email, u.password, l.latitude, l.longitude, l.address, c.name as city," +
  "p.name as province, r.title as role FROM students as s JOIN users as u ON s.user_id = u.id JOIN locations as l ON " +
  "s.locations_id = l.id JOIN city as c ON l.city_id = c.id JOIN province as p ON c.province_id = p.id JOIN role as r ON " +
  "u.role_id = r.id WHERE s.id = ?";

/** QUERY para obtener todos los estudiantes activos */
const sqlGetAllActiveStudents =
  "SELECT s.id, s.is_active, s.phone, s.avatar, DATE_FORMAT(u.subscribed, '%d/%m/%Y %H:%i') as subscribed_date," +
  "DATE_FORMAT(u.unsubscribed, '%d/%m/%Y %H:%i') as unsubscribed_date, u.id as user_id, u.first_name," +
  "u.last_name, u.username ,u.email, u.password, l.latitude, l.longitude, l.address, c.name as city," +
  "p.name as province, r.title as role FROM students as s JOIN users as u ON s.user_id = u.id JOIN locations as l ON " +
  "s.locations_id = l.id JOIN city as c ON l.city_id = c.id JOIN province as p ON c.province_id = p.id JOIN role as r ON " +
  "u.role_id = r.id WHERE s.is_active = 1";

/** QUERY para obtener todos los estudiantes inactivos */
const sqlGetAllDeactiveStudents =
  "SELECT s.id, s.is_active, s.phone, s.avatar, DATE_FORMAT(u.subscribed, '%d/%m/%Y %H:%i') as subscribed_date," +
  "DATE_FORMAT(u.unsubscribed, '%d/%m/%Y %H:%i') as unsubscribed_date, u.id as user_id, u.first_name," +
  "u.last_name, u.username ,u.email, u.password, l.latitude, l.longitude, l.address, c.name as city," +
  "p.name as province, r.title as role FROM students as s JOIN users as u ON s.user_id = u.id JOIN locations as l ON " +
  "s.locations_id = l.id JOIN city as c ON l.city_id = c.id JOIN province as p ON c.province_id = p.id JOIN role as r ON " +
  "u.role_id = r.id WHERE s.is_active = 0";

const getAllStudents = () => {
  return db.query(sqlGetAllStudents);
};

const getStudentById = (studentId) => {
  return db.query(sqlGetStudentById, [studentId]);
};

const createStudent = ({ user_id, locations_id, phone, avatar }) => {
  return db.query(
    "INSERT INTO students (user_id, locations_id, phone, avatar) VALUES (?, ?, ?, ?)",
    [user_id, locations_id, phone, avatar]
  );
};

const updateStudent = (
  studentId,
  { user_id, locations_id, phone, avatar, is_active }
) => {
  return db.query(
    "UPDATE students SET user_id = ?, locations_id = ?, phone = ?, avatar = ?, is_active = ? WHERE id = ?",
    [user_id, locations_id, phone, avatar, is_active, studentId]
  );
};

const getStudent = (studentId) => {
  return db.query("select * from students WHERE id = ?", [studentId]);
};

const deactiveStudent = (studentId) => {
  return db.query("UPDATE students SET is_active = 0 WHERE id = ?", [
    studentId,
  ]);
};

const activeStudent = (studentId) => {
  return db.query("UPDATE students SET is_active = 1 WHERE id = ?", [
    studentId,
  ]);
};

const getActiveStudent = () => {
  return db.query(sqlGetAllActiveStudents);
};

const getDeactiveStudent = () => {
  return db.query(sqlGetAllDeactiveStudents);
};

/**** Student QUERY to use in other classes */
const getIdStudentByUserId = (userId) => {
  return db.query("select id from students where user_id = ?", [userId]);
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  getStudent,
  deactiveStudent,
  activeStudent,
  getActiveStudent,
  getDeactiveStudent,
  getIdStudentByUserId,
};
