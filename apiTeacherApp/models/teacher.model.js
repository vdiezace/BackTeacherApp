/** Query para obtener todos los profesores
 * incluyendo:
 * datos de usuario: first_name, last_name, username, email, password, subscribed & unsubscribed e incluyendo el rol
 * localizacion: latitude, longitude e incluyendo: city & province
 * categoría: title, description
 */
const sqlTeachersData =
  "select u.id as user_id, u.first_name, u.last_name, u.username, u.email, u.password," +
  "DATE_FORMAT(u.subscribed, '%d/%m/%Y %H:%i') as subscribed_date, DATE_FORMAT(u.unsubscribed, '%d/%m/%Y %H:%i') as unsubscribed_date, u.role_id," +
  "t.id as teacher_id, t.phone, t.categories_id as category_id, cat.title as category_title," +
  "cat.description as category_description, t.price_hour, t.experience, t.is_approved," +
  "t.locations_id, l.address, l.latitude, l.longitude, l.city_id, c.name as city, c.province_id," +
  "p.name as province, t.avatar, t.subject, t.start_class_hour, t.end_class_hour from users u, teachers t, categories cat, locations l, city c, province p where (u.id=t.users_id)" +
  "and (t.categories_id=cat.id) and (t.locations_id=l.id) and (l.city_id=c.id) and (c.province_id=p.id) and (u.role_id=2)";

/** Query para obtener todos los profesores
 * incluyendo:
 * datos de usuario: first_name, last_name, username, email, password, subscribed & unsubscribed e incluyendo el rol
 * localizacion: latitude, longitude e incluyendo: city & province
 * categoría: title, description,
 * reviews
 */
const sqlAllTeacherData =
  "select u.id as user_id, u.first_name, u.last_name, u.username, u.email, u.password," +
  "DATE_FORMAT(u.subscribed, '%d/%m/%Y %H:%i') as subscribed_date, DATE_FORMAT(u.unsubscribed, '%d/%m/%Y %H:%i') as unsubscribed_date," +
  "u.role_id, t.id as teacher_id, t.phone, t.categories_id , cat.title as category_title, cat.description as category_description," +
  "t.price_hour, t.experience, t.is_approved, t.locations_id, l.address, l.latitude, l.longitude, l.city_id," +
  "c.name as city, c.province_id, p.name as province, t.avatar, t.subject, t.start_class_hour," +
  "t.end_class_hour, CAST(AVG(r.rating) AS DECIMAL(10,2)) as avg_rating from users u, teachers t," +
  "categories cat, locations l, city c, province p, reviews r  where (u.id=t.users_id)" +
  "and (t.categories_id=cat.id) and (t.locations_id=l.id) and (l.city_id=c.id) and (c.province_id=p.id)" +
  "and (u.role_id=2) and (t.id=r.teachers_id) group by teacher_id UNION select u.id as users_id, u.first_name, u.last_name, u.username, u.email, u.password," +
  "DATE_FORMAT(u.subscribed, '%d/%m/%Y %H:%i'), DATE_FORMAT(u.unsubscribed, '%d/%m/%Y %H:%i'), u.role_id," +
  "t.id as teacher_id, t.phone, t.categories_id, cat.title as category_title, cat.description as category_description," +
  "t.price_hour, t.experience,  t.is_approved, t.locations_id, l.address, l.latitude, l.longitude," +
  "l.city_id, c.name as city, c.province_id, p.name as province, t.avatar, t.subject, t.start_class_hour," +
  "t.end_class_hour, 0 as avg_rating from users u, teachers t, categories cat, locations l, city c," +
  "province p where (u.id=t.users_id) and (t.categories_id=cat.id) and (t.locations_id=l.id)" +
  "and (l.city_id=c.id) and (c.province_id=p.id) and (u.role_id=2)" +
  "and not exists (select distinct teachers_id from reviews where reviews.teachers_id = t.id)";

/* Query para obtener las clases de un profesor incluyendo: 
datos del estudiante: first_name, last_name
categoria: title,
clases: creation, title, start_date, start_hour, end_hour
*/
const sqlTeacherClassesByTeacherId =
  "select c.id as class_id, c.students_id, u.first_name, u.last_name," +
  "cat.title as category, DATE_FORMAT(c.creation,'%d/%m/%Y %H:%i') as creation_date, c.title as subjects, DATE_FORMAT(c.start_date, '%d/%m/%Y %H:%i') as start_date, c.start_hour," +
  "c.end_hour from classes c, teachers t, students s, users u, categories cat where (c.cancel_date is null)" +
  "and (c.teachers_id = t.id) and (c.students_id = s.id) and (t.categories_id = cat.id) and (s.users_id = u.id)" +
  "and (t.id=?) order by c.start_date";

const sqlCreateNewTeacher =
  "INSERT INTO teachers (users_id, categories_id, locations_id, price_hour, experience, is_approved," +
  "phone, subject, avatar, start_class_hour, end_class_hour) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

const sqlUpdateTeacherById =
  "UPDATE teachers SET users_id = ?, categories_id = ?, locations_id = ?, price_hour = ?, experience = ?," +
  "is_approved = ?, phone = ?, subject = ?, avatar = ?, start_class_hour = ?, end_class_hour = ? WHERE id = ?";

const sqlTeacherClassesByStudentId = "SELECT * FROM teachers t INNER JOIN classes c ON c.teachers_id = t.id INNER JOIN students s ON s.id = c.students_id WHERE s.id =?;"

const sqlTeacherIdByUserId = "SELECT * FROM teachers AS t INNER JOIN users AS u ON t.users_id = u.id" +
"INNER JOIN role AS r ON r.id = u.role_id WHERE r.title = teacher AND u.id = ?;"

const sqlDeactiveTeachers = "SELECT t.id, t.is_approved, t.phone, t.avatar, u.subscribed as subscribed_date," +
"u.unsubscribed as unsubscribed_date, u.id as user_id, u.first_name, u.last_name, u.email, u.password, l.latitude," +
"l.longitude, l.address, c.name as city, p.name as province, r.title as role FROM teachers as t JOIN users as u ON " +
"t.users_id = u.id  JOIN locations as l ON t.locations_id = l.id JOIN city as c ON l.city_id = c.id JOIN province as p ON " +
"c.province_id = p.id JOIN role as r ON u.role_id = r.id where is_approved = 0;"

// TODO: Hacer método con la paginación de los profes
const getTeachersByPage = (page, limit) => {
  return executeQuery(sqlAllTeacherData + ' order by teacher_id' + ' limit ? offset ?', [limit, (page - 1) * limit]);
}

const getAllTeachers = () => {
  return db.query(sqlAllTeacherData + "order by teacher_id");
};

const getTeacherById = (teacherId) => {
  return db.query(sqlTeachersData + " and (t.id = ?)", [teacherId]);
};

const getTeacherByFilter = (filter) => {
  return db.query(sqlAllTeacherData + filter);
};

const getTeacherClassHours = (teacherId) => {
  return db.query(
    "select start_class_hour, end_class_hour from teachers where id = ?",
    [teacherId]
  );
};

const createTeacher = ({
  user_id,
  category_id,
  locations_id,
  price_hour,
  experience,
  is_approved,
  phone,
  subject,
  avatar,
  start_class_hour,
  end_class_hour,
}) => {
  return db.query(sqlCreateNewTeacher, [
    user_id,
    category_id,
    locations_id,
    price_hour,
    experience,
    is_approved,
    phone,
    subject,
    avatar,
    start_class_hour,
    end_class_hour,
  ]);
};

const updateTeacher = (
  teacherId,
  {
    user_id,
    category_id,
    locations_id,
    price_hour,
    experience,
    is_approved,
    phone,
    subject,
    avatar,
    start_class_hour,
    end_class_hour,
  }
) => {
  return db.query(sqlUpdateTeacherById, [
    user_id,
    category_id,
    locations_id,
    price_hour,
    experience,
    is_approved,
    phone,
    subject,
    avatar,
    start_class_hour,
    end_class_hour,
    teacherId,
  ]);
};

const getTeacher = (teacherId) => {
  return db.query("select * from teachers WHERE id = ?", [teacherId]);
};

const validateTeacher = (teacherId) => {
  return db.query("update teachers set is_approved = 1 WHERE id = ?", [
    teacherId,
  ]);
};

const unvalidatedTeacher = (teacherId) => {
  return db.query("update teachers set is_approved = 0 WHERE id = ?", [
    teacherId,
  ]);
};

const getIdTeacherByUserId = (userId) => {
  return db.query("select id from teachers WHERE users_id = ?", [userId]);
};

const getCategoryById = (categoryId) => {
  return db.query("select * from categories where id=?", [categoryId]);
};

const getTeacherByEmail = (email) => {
  return db.query(sqlTeachersData + "(u.email = ?)", [email]);
};

const getTeacherClassesByTeacherId = (teacherId) => {
  return db.query(sqlTeacherClassesByTeacherId, [teacherId]);
};

const getTeacherClassesByStudentId = (studentId) => {
  return db.query(sqlTeacherClassesByStudentId, [studentId]);
}

const getTeacherByUserId = (teacherId) =>{
  return db.query(sqlTeacherIdByUserId, [teacherId])
}

const getDeactiveTeachers = () => {
  return db.query(sqlDeactiveTeachers)
}

module.exports = {
  getAllTeachers,
  getTeacherById,
  getTeacherByFilter,
  getTeacherClassHours,
  createTeacher,
  updateTeacher,
  getTeacher,
  validateTeacher,
  unvalidatedTeacher,
  getIdTeacherByUserId,
  getCategoryById,
  getTeacherByEmail,
  getTeacherClassesByTeacherId,
  getTeacherClassesByStudentId,
  getTeachersByPage,
  getTeacherByUserId,
  getDeactiveTeachers
};
