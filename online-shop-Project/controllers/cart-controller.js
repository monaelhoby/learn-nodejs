const cartModel = require('../models/cart-model');
const validationResult = require('express-validator').validationResult



exports.getCart = (req, res) => {
    cartModel.getItemByUserId(req.session.userId).then(items => {
        res.render('cart', {
            items : items,
            isUser: true,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
            pageTitle: 'Cart'
        })
    }).catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
    if(validationResult(req).isEmpty()){
        cartModel.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            userId: req.session.userId,
            productId: req.body.productId,
            timeStamp: Date.now()
        }).then(() => {
            res.redirect('/cart')
        }).catch(err => {
            console.log(err)
        })
    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}

exports.postSaveCart = (req, res, next) => {
    if(validationResult(req).isEmpty()){
        cartModel.editItem(req.body.cartId,{
            amount: req.body.amount,
            timeStamp: Date.now()
        }).then(() => {
            res.redirect('/cart')
        }).catch(err => {
            console.log(err)
        })
    } else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect('/cart')
    }
}

exports.deleteItem = (req, res) => {
    cartModel.deleteItem(req.body.cartId)
    .then(() => {
        res.redirect('/cart')
    }).catch(err => {
        console.log(err)
    })
}

exports.deleteAllItems = (req, res, next) => {
    cartModel.deleteAll()
    .then(() => {
        res.redirect('/cart')
    }).catch(err => {
        console.log(err)
    })
}