const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check

const authController = require('../controllers/auth-controller');
const authGaurd = require('./protectedRouter/auth-guard')

router.get('/signup',authGaurd.isNotAuth, authController.getSignup);

router.post(
    '/signup',
    authGaurd.isNotAuth,
    bodyParser.urlencoded({extended: true}),
    check('name').not().isEmpty().withMessage("name is required"),//required
    check('email').not().isEmpty().withMessage("email is required")
    .isEmail().withMessage("invalid email"),
    check('password').not().isEmpty().withMessage("passowrd is required")
    .isLength({min:6,max:12}).withMessage("password must be at least 6 charachter"),
    check('confirmPassowrd').custom((value, {req}) => {  //custom validation  second param is meta that has req ==> req.meta = {req}
        if(value === req.body.password) return true
        else throw("password not equal")
    }),
    authController.postSignup
    );

router.get('/login', authGaurd.isNotAuth, authController.getLogin);

router.post(
    '/login',
    authGaurd.isNotAuth,
    bodyParser.urlencoded({extended: true}),
    authController.postLogin
    );

router.all(
    '/logout',
    authGaurd.isAuth,
    authController.logout
)


module.exports = router