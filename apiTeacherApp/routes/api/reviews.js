const router = require("express").Router();

const {
  getById,
  create,
  update,
  getReviewByTeacherAndStudent,
} = require("../../models/review.model");

router.get("/:reviewId", async (req, res) => {
  //res.json("Obteniendo un comentario by ID");
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
  //res.json("creando un nuevo review");
  try {
    const [result] = await create(req.body);
    const [review] = await getById(result.insertId);
    res.json(review[0]);
  } catch (error) {
    res.status(500).json({ fatal: error.message });
  }
});

router.put("/:reviewId", async (req, res) => {
  //res.json("editando una review");
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

router.get("/", async (req, res) => {
  //res.json("Obteniedo una review by teacher & student ID");
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
    res.json(review[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
});

module.exports = router;
