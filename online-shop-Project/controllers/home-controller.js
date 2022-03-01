// middlewares that connect between model and views

const productsModel = require('../models/products')

exports.getHome = (req, res, next) => {
    let category = req.query.category;
    if(category && category !== "all"){
        return productsModel.getProductsByCategory(category).then(products => {
             res.render('index', {
                products: products,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                validationError: req.flash('validationErrors')[0],
                pageTitle: 'Home'
            })
        })
    }else{
        return productsModel.getAllProducts(category).then(products => {
             res.render('index', {
                products: products,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                validationError: req.flash('validationErrors')[0],
                pageTitle: 'Home'
        })
    })
    }
}