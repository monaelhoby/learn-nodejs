const router = require('express').Router();

const profileController = require('../controllers/profile-controller');
const authGaurd = require('./protectedRouter/auth-guard')

router.get('/', authGaurd.isAuth, profileController.redirect)

router.get('/:id', authGaurd.isAuth, profileController.getProfile)


module.exports = router