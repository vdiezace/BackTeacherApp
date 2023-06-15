const getById = (reviewId) => {
  return db.query("SELECT * FROM reviews WHERE id = ?", [reviewId]);
};

const create = ({ teacher_id, student_id, rating, comment }) => {
  return db.query(
    "INSERT INTO reviews (teacher_id, student_id, rating, comment) VALUES (?, ?, ?, ?)",
    [teacher_id, student_id, rating, comment]
  );
};

const update = (reviewId, { teacher_id, student_id, rating, comment }) => {
  return db.query(
    "UPDATE reviews SET teacher_id = ?, student_id = ?, rating = ?, comment = ? WHERE id = ?",
    [teacher_id, student_id, rating, comment, reviewId]
  );
};

const getReviewByTeacherAndStudent = (teacher_id, student_id) => {
  return db.query(
    "select * from reviews where teacher_id = ? and student_id = ?",
    [teacher_id, student_id]
  );
};

const getAvgReviewRatingByTeacher = (teacherId) => {
  return db.query(
    "select CAST(AVG(rating) AS DECIMAL(10,2)) as avg_rating from reviews where teacher_id = ?",
    [teacherId]
  );
};

const getReviewByStudentId = (studentId) => {
  return db.query("select * from reviews r where student_id = ?", [studentId]);
};

module.exports = {
  getById,
  create,
  update,
  getReviewByTeacherAndStudent,
  getAvgReviewRatingByTeacher,
  getReviewByStudentId,
};
