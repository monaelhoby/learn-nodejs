const router = require('express').Router();

const productController = require("../controllers/product-controller")
const AuthGuard = require("./protectedRouter/auth-guard")

router.get('/', AuthGuard.isAuth,productController.getProduct)

router.get('/:id', AuthGuard.isAuth, productController.getProductById)

module.exports = router