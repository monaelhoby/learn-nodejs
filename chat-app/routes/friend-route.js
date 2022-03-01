const router = require('express').Router();
const bodyParser = require('body-parser').urlencoded({extended: true});

const friendController = require('../controllers/friend-controller');
const authGaurd = require('./protectedRouter/auth-guard');

// router.post('/add', authGaurd.isAuth, bodyParser, friendController.add)
router.post('/delete', authGaurd.isAuth, bodyParser, friendController.delete)
router.post('/cancel', authGaurd.isAuth, bodyParser, friendController.cancel)
router.post('/accept', authGaurd.isAuth, bodyParser, friendController.accept)
router.post('/reject', authGaurd.isAuth, bodyParser, friendController.reject)


module.exports = router