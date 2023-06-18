/* QUERY para obtener una clase por el ID de un estudiante */
const sqlClassesByStudentId =
  "SELECT c.id, u.first_name as teacher_name, u.last_name as teacher_surname, c.teachers_id, cat.title as category," +
  "DATE_FORMAT(c.creation, '%d/%m/%Y %H:%i') as creation_date, DATE_FORMAT(c.start_date,'%d/%m/%Y') as start_date," +
  "c.start_hour, c.end_hour FROM classes as c JOIN teachers as t ON c.teachers_id = t.id JOIN students as s ON " +
  "c.students_id = s.id JOIN categories as cat ON t.categories_id = cat.id JOIN users as u ON t.users_id = u.id WHERE s.id = ?";

/* QUERY para obtener las clases reservadas por id de la clase */
const sqlBookedClasses =
  "select id, DATE_FORMAT(creation, '%d/%m/%Y %H:%i') as creation_date, teachers_id, students_id, title," +
  "start_hour, end_hour, DATE_FORMAT(start_date, '%d/%m/%Y %H:%i') as start_date, DATE_FORMAT(cancel_date, '%d/%m/%Y %H:%i') as cancel_date from classes where id = ?";

/* QUERY para obtener las clases reservadas que están activadas por teacher y por fecha*/
const sqlActiveBookedClasses =
  "select id, DATE_FORMAT(creation, '%d/%m/%Y %H:%i') as creation_date, teachers_id, students_id, title," +
  "start_hour, end_hour, DATE_FORMAT(start_date, '%d/%m/%Y %H:%i') as start_date, DATE_FORMAT(cancel_date,'%d/%m/%Y %H:%i') as cancel_date from classes where (cancel_date is null) and (teachers_id=?) and (start_date=?)";

const getClassesByStudentId = (studentId) => {
  return db.query(sqlClassesByStudentId, [studentId]);
};

const createClass = ({
  start_hour,
  end_hour,
  start_date,
  teachers_id,
  students_id,
}) => {
  return db.query(
    "insert into classes (start_hour, end_hour, start_date, teachers_id, students_id) values (?, ?, ?, ?, ?)",
    [start_hour, end_hour, start_date, teachers_id, students_id]
  );
};

const getBookedClasses = (classId) => {
  return db.query(sqlBookedClasses, [classId]);
};

const getActiveBookedClasses = (teacherId, date) => {
  return db.query(sqlActiveBookedClasses, [teacherId, date]);
};

const deleteClassById = (classId) => {
  return db.query("delete * from classes where id = ?", [classId]);
}

const getClassById = (classId) => {
  return db.query("select * from classes where id = ?", [classId])
}
module.exports = {
  getClassesByStudentId,
  createClass,
  getBookedClasses,
  getActiveBookedClasses,
  deleteClassById,
  getClassById
};
