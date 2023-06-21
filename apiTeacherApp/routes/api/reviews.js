const router = require("express").Router();

const {
  getById,
  create,
  update,
  getReviewByTeacherAndStudent,
  getReviewByStudentId,
  getReviewByTeacherId,
} = require("../../models/review.model");

router.get("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  try {
    const [review] = await getById(reviewId);
    if (review.length === 0) {
      return res.json({
        fatal: "No existe ninguna review con el ID = " + reviewId,
      });
    }
    res.json(review[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const [result] = await create(req.body);
    const [review] = await getById(result.insertId);
    res.json(review[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

router.put("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  try {
    await update(reviewId, req.body);
    const [review] = await getById(reviewId);
    if (review.length === 0) {
      return res.json({ message: "No existe la review con ID = " + reviewId });
    }
    res.json(review[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/* GET {{host}}/api/reviews?teacherid=1&studentid=1 */
router.get("/", async (req, res) => {
  const { teacherid: teacherId, studentid: studentId } = req.query;
  try {
    const [review] = await getReviewByTeacherAndStudent(teacherId, studentId);
    if (review.length === 0) {
      return res.json({
        message:
          "No existe la review con el ID del profesor " +
          teacherId +
          " ni con el ID del estudiante " +
          studentId,
      });
    }
    res.json(review);
  } catch (error) {
    res.json({ fatal: error.message });
  }
});

/** GET reviews by an student ID */
router.get("/student/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const [review] = await getReviewByStudentId(studentId);
    if (review.length === 0) {
      return res.json({
        message: "No existe la review con el ID del estudiante =  " + studentId,
      });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

/** GET reviews by an student ID */
router.get("/teacher/:teacherId", async (req, res) => {
  const { teacherId } = req.params;
  try {
    const [review] = await getReviewByTeacherId(teacherId);
    if (review.length === 0) {
      return res.json({
        message: "No existe la review con el ID del profesor =  " + teacherId,
      });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

module.exports = router;
