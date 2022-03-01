const router = require('express').Router();

const chatController = require('../controllers/chat-controller');
const authGaurd = require('./protectedRouter/auth-guard');

router.get('/:id', authGaurd.isAuth, chatController.getChat)


module.exports = router