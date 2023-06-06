const router = require('express').Router();

const { checkToken, checkAdmin } = require('../utils/middlewares');

router.use('/clients',
    checkToken,
    require('./api/clients'));

router.use('/teachers',
    checkToken,
    checkAdmin,
    require('./api/teachers'));
router.use('/users', require('./api/users'));

module.exports = router;