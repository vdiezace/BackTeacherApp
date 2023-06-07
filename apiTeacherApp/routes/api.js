const router = require("express").Router();

router.use("/admin", require("./api/admin"));
router.use("/users", require("./api/users"));
router.use("/students", require("./api/students"));
router.use("/students-classes", require("./api/students-classes"));
router.use("/teachers", require("./api/teachers"));
router.use("/teachers-classes", require("./api/teachers-classes"));
router.use("/reviews", require("./api/reviews"));
router.use("/booking", require("./api/booking"));

module.exports = router;
