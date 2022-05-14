const express = require('express');
const res = require('express/lib/response');

const cartRepo = require("../repositories/cart")
const productsRepo = require('../repositories/products')
const showCartTemplate = require('../views/carts/show')

const router = express.Router();

router.post('/cart/products', async (req, res) => {
    
    let cart;
    if(!req.session.cartId){
        cart = await cartRepo.create({items: []})
        req.session.cartId = cart.id
    }else{
        cart = await cartRepo.getOne(req.session.cartId)
    }
    const existItem = cart.items.find(item => item.id === req.body.productId)
    
    if(existItem){
        existItem.quantity++
    }else{
        cart.items.push({id: req.body.productId, quantity: 1})
    }

    await cartRepo.update(cart.id, {items: cart.items})

    return res.redirect('/cart')
})

router.get('/cart', async (req, res) => {
    if(!req.session.cartId){
        return res.redirect('/')
    }
    const cart = await cartRepo.getOne(req.session.cartId)
    // console.log("thecart", cart)
    for (let item of cart.items){
        const product = await productsRepo.getOne(item.id)
        item.product = product
    }
    res.send(showCartTemplate({items: cart.items}))
})

router.post('/cart/products/delete', async (req, res) => {
    
    const cart = await cartRepo.getOne(req.session.cartId)
    
    const remainingItems = cart.items.filter(item => item.id !== req.body.itemId)
    
    await cartRepo.update(req.session.cartId, {items: remainingItems})
    res.redirect('/cart')
})

module.exports = router