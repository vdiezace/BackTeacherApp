const getById = (reviewId) => {
  return db.query("SELECT * FROM reviews WHERE id = ?", [reviewId]);
};

const create = ({ teachers_id, students_id, rating, comment }) => {
  return db.query(
    "INSERT INTO reviews (teachers_id, students_id, rating, comment) VALUES (?, ?, ?, ?)",
    [teachers_id, students_id, rating, comment]
  );
};

const update = (reviewId, { teachers_id, students_id, rating, comment }) => {
  return db.query(
    "UPDATE reviews SET teachers_id = ?, students_id = ?, rating = ?, comment = ? WHERE id = ?",
    [teachers_id, students_id, rating, comment, reviewId]
  );
};

const getReviewByTeacherAndStudent = (teacher_id, student_id) => {
  return db.query(
    "select * from reviews where teachers_id = ? and students_id = ?",
    [teacher_id, student_id]
  );
};

const getAvgReviewRatingByTeacher = (teacherId) => {
  return db.query(
    "select CAST(AVG(rating) AS DECIMAL(10,2)) as avg_rating from reviews where teachers_id = ?",
    [teacherId]
  );
};

const getReviewByStudentId = (studentId) => {
  return db.query("select * from reviews r where students_id = ?", [studentId]);
};

const getReviewByTeacherId = (teacherId) => {
  return db.query("select * from reviews r where teachers_id = ?", [teacherId]);
};

module.exports = {
  getById,
  create,
  update,
  getReviewByTeacherAndStudent,
  getAvgReviewRatingByTeacher,
  getReviewByStudentId,
  getReviewByTeacherId
};
