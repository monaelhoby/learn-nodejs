const router = require('express').Router();

const homeController = require('../controllers/home-controller');
const authGaurd = require('./protectedRouter/auth-guard');

router.get('/delete', authGaurd.isAuth, homeController.getHome)


module.exports = router