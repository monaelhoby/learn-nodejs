const router = require('express').Router();

const homeController = require('../controllers/home-controller')
const isGuard = require('./protectedRouter/auth-guard')

router.get('/', isGuard.isAuth, homeController.getHome)

module.exports = router