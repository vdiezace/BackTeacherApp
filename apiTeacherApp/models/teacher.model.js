/** Query para obtener todos los profesores
 * incluyendo:
 * datos de usuario: first_name, last_name, username, email, password, subscribed & unsubscribed e incluyendo el rol
 * localizacion: latitude, longitude e incluyendo: city & province
 * categoría: title, description
 */
const sqlTeachersData =
  "select u.id as user_id, u.first_name, u.last_name, u.email, u.password," +
  "DATE_FORMAT(u.subscribed, '%d/%m/%Y %H:%i') as subscribed_date, DATE_FORMAT(u.unsubscribed, '%d/%m/%Y %H:%i') as unsubscribed_date, u.role_id," +
  "t.id as teacher_id, t.phone, t.category_id, cat.title as category_title," +
  "cat.description as category_description, t.price_hour, t.experience, t.is_approved," +
  "t.locations_id, l.address, l.latitude, l.longitude, l.city_id, c.name as city, c.province_id," +
  "p.name as province, t.avatar, t.subject, t.start_class_hour, t.end_class_hour from users u, teachers t, categories cat, locations l, city c, province p where (u.id=t.user_id)" +
  "and (t.category_id=cat.id) and (t.locations_id=l.id) and (l.city_id=c.id) and (c.province_id=p.id) and (u.role_id=3)";

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
  "u.role_id, t.id as teacher_id, t.phone, t.category_id, cat.title as category_title, cat.description as category_description," +
  "t.price_hour, t.experience, t.is_approved, t.locations_id, l.address, l.latitude, l.longitude, l.city_id," +
  "c.name as city, c.province_id, p.name as province, t.avatar, t.subject, t.start_class_hour," +
  "t.end_class_hour, CAST(AVG(r.rating) AS DECIMAL(10,2)) as avg_rating from users u, teachers t," +
  "categories cat, locations l, city c, province p, reviews r  where (u.id=t.user_id)" +
  "and (t.category_id=cat.id) and (t.locations_id=l.id) and (l.city_id=c.id) and (c.province_id=p.id)" +
  "and (u.role_id=3) and (t.id=r.teacher_id) group by teacher_id UNION select u.id as user_id, u.first_name, u.last_name, u.username, u.email, u.password," +
  "DATE_FORMAT(u.subscribed, '%d/%m/%Y %H:%i'), DATE_FORMAT(u.unsubscribed, '%d/%m/%Y %H:%i'), u.role_id," +
  "t.id as teacher_id, t.phone, t.category_id, cat.title as category_title, cat.description as category_description," +
  "t.price_hour, t.experience,  t.is_approved, t.locations_id, l.address, l.latitude, l.longitude," +
  "l.city_id, c.name as city, c.province_id, p.name as province, t.avatar, t.subject, t.start_class_hour," +
  "t.end_class_hour, 0 as avg_rating from users u, teachers t, categories cat, locations l, city c," +
  "province p where (u.id=t.user_id) and (t.category_id=cat.id) and (t.locations_id=l.id)" +
  "and (l.city_id=c.id) and (c.province_id=p.id) and (u.role_id=3)" +
  "and not exists (select distinct teacher_id from reviews where reviews.teacher_id = t.id)";

/* Query para obtener las clases de un profesor incluyendo: 
datos del estudiante: first_name, last_name
categoria: title,
clases: creation, title, start_date, start_hour, end_hour
*/
const sqlTeacherClassesByTeacherId =
  "select c.id as class_id, c.students_id, u.first_name, u.last_name," +
  "cat.title as category, c.creation as creation_date, c.title as subjects,c.start_date, c.start_hour," +
  "c.end_hour from classes c, teachers t, students s, users u, categories cat where (c.cancel_date is null)" +
  "and (c.teachers_id = t.id) and (c.students_id = s.id) and (t.category_id = cat.id) and (s.user_id = u.id)" +
  "and (t.id=?) order by c.start_date";

const sqlCreateNewTeacher =
  "INSERT INTO teachers (user_id, category_id, locations_id, price_hour, experience, is_approved," +
  "phone, subject, avatar, start_class_hour, end_class_hour) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

const sqlUpdateTeacherById =
  "UPDATE teachers SET user_id = ?, category_id = ?, locations_id = ?, price_hour = ?, experience = ?," +
  "is_approved = ?, phone = ?, subject = ?, avatar = ?, start_class_hour = ?, end_class_hour = ? WHERE id = ?";

// TODO: Hacer método con la paginación de los profes

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

const getIdTeacherByUsedId = (userId) => {
  return db.query("select id from teachers WHERE user_id = ?", [userId]);
};

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
  getIdTeacherByUsedId,
};
