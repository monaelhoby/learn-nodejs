const ProductModel = require('../models/products')

exports.getProductById= (req, res, next) => {
    res.setHeader("Contet-Type", "text/html");
    let id = req.params.id
    ProductModel.getProductByID(id).then(product => {
        // console.log("product", product)
        res.render('product',{
            product: product,
            isUser: true,
            isAdmin: req.session.isAdmin,
            pageTitle: product.name
        })
    })
}

exports.getProduct= (req, res, next) => {
    res.setHeader("Contet-Type", "text/html");
    let id = req.params.id
    ProductModel.getFirstProduct().then(product => {
        // console.log("product", product)
        return res.render('product',{
            product: product,
            isUser: true,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Products'
        })
    })
}