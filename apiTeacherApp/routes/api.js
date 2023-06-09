const router = require("express").Router();

const { checkToken, checkAdmin } = require('../utils/middlewares');

router.use("/admin", 
    checkToken,
    require("./api/admin"));
    
router.use("/users", require("./api/users"));
router.use("/students", require("./api/students"));

router.use("/students-classes", 
    checkToken,
    require("./api/students-classes"));

router.use("/teachers", require("./api/teachers"));

router.use("/teachers-classes", 
    checkToken,
    require("./api/teachers-classes"));

router.use("/reviews", require("./api/reviews"));
router.use("/booking", require("./api/booking"));

module.exports = router;
