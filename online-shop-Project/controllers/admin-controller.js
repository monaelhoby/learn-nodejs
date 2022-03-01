const validationResult = require('express-validator').validationResult

const TheProductModel = require('../models/products')


exports.getAddNewProduct = (req, res, next) => {
    res.render('add-product',{
        validationError: req.flash("vlaidationError"),
        isUser: true,
        isAdmin: true,
        pageTitle: 'Add Product'
    })
}

exports.postAddNewProduct = (req, res, next) => {
    if(validationResult(req).isEmpty()){
        TheProductModel.addProduct({
            name: req.body.name,
            image: req.file.filename,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category
        }).then(() => {
            req.flash("added", true)
            res.redirect('/')
        }).catch(err => {
            res.redirect('/error')
        })
    }else{
        req.flash('validationErrors', validationResult(req).array())
        res.redirect('/admin/add')
    }
}

exports.deleteTheProduct = (req, res, next) => {
    console.log(req.body)
    // TheProductModel.deleteProduct(req.body.productId)
    // .then(() => {
    //     res.redirect('/')
    // }).catch(err => {
    //     console.log(err)
    // })
}