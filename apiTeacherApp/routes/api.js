const { checkToken } = require("../utils/middlewares");

const router = require("express").Router();

router.use("/admin", checkToken, require("./api/admin"));

router.use("/users", require("./api/users"));
router.use("/students", checkToken, require("./api/students"));

router.use("/students-classes", require("./api/students-classes"));

router.use("/teachers", checkToken, require("./api/teachers"));

router.use("/teachers-classes", require("./api/teachers-classes"));

router.use("/reviews", require("./api/reviews"));
router.use("/classes", require("./api/classes"));

module.exports = router;
