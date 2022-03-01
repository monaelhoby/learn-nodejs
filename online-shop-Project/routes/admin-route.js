const router = require('express').Router();
const multer = require('multer'); // body-parser not used because encoded type changed
const check = require('express-validator').check

const adminController = require('../controllers/admin-controller');
const adminGaurd = require('./protectedRouter/admin-guard');

router.get('/add',
    adminGaurd,
    adminController.getAddNewProduct
    )

router.post('/add',
    adminGaurd,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, 'images')
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + '-' + file.originalname)
            },
        })
    }).single('image'), // because it only input file type
    check('name').not().isEmpty().withMessage("name is required"),//required
    check('price').not().isEmpty().isInt().withMessage("price is required"),
    check('image').custom((value, {req}) => {
        if(req.file) return true
        else throw 'image is required'
    }),
    adminController.postAddNewProduct
    )

    router.post(
        '/delete',
        adminGaurd,
        // multer({
        //     storage: multer.diskStorage({
        //         destination: (req, file, callback) => {
        //             callback(null, 'images')
        //         },
        //         filename: (req, file, callback) => {
        //             callback(null, Date.now() + '-' + file.originalname)
        //         },
        //     })
        // }).single('image'), // because it only input file type
        // check('name').not().isEmpty().withMessage("name is required"),//required
        // check('price').not().isEmpty().isInt().withMessage("price is required"),
        // check('image').custom((value, {req}) => {
        //     if(req.file) return true
        //     else throw 'image is required'
        // }),
        adminController.deleteTheProduct
        )

module.exports = router