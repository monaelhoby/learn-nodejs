const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check

const cartController = require('../controllers/cart-controller')
const authGuard = require('./protectedRouter/auth-guard')

router.get(
        '/',
        authGuard.isAuth, 
        cartController.getCart
        )

router.post(
    '/', 
    authGuard.isAuth, 
    bodyParser.urlencoded({extended: true}), 
    check('amount')
    .not()
    .isEmpty()
    .withMessage('amount required')
    .isInt({min:1})
    .withMessage("amount must be greater than 1"),
    cartController.postCart
    )

router.post(
    '/save',
    authGuard.isAuth, 
    bodyParser.urlencoded({extended: true}), 
    check('amount')
    .not()
    .isEmpty()
    .withMessage('amount required')
    .isInt({min:1})
    .withMessage("amount must be greater than 1"),
    cartController.postSaveCart
    )

router.post(
    '/delete',
    authGuard.isAuth, 
    bodyParser.urlencoded({extended: true}),
    cartController.deleteItem
    )
    
router.post(
    '/deleteAll',
    authGuard.isAuth, 
    bodyParser.urlencoded({extended: true}),
    cartController.deleteAllItems
    )


module.exports = router