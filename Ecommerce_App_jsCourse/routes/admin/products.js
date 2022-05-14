const express = require('express');
const multer = require('multer')


const router = express.Router();
const productsRepo = require('../../repositories/products')
const addProductsTemplate = require("../../views/admin/products/new")
const productsIndexTemplate = require('../../views/admin/products/index')
const productEditTemplate = require('../../views/admin/products/edit')
const {handleErrors, requireAuth} = require("./middleware")
const {
    requirePrice,
    requireTitle
  } = require('./validators');

const upload =  multer({
    storage: multer.memoryStorage()
});

router.get('/admin/products', requireAuth, async (req, res) => {
    const products = await productsRepo.getAll()
    res.send(productsIndexTemplate({products}))
})

router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(addProductsTemplate({}))
})

router.post(
    '/admin/products/new', 
    requireAuth,
    upload.single('image'),
    [requirePrice, requireTitle],
    handleErrors(addProductsTemplate),
    async (req, res) => {
    const image = req.file.buffer ? req.file.buffer.toString('base64') : '';
    const {title, price} = req.body
    await productsRepo.create({title, price, image})
    res.redirect('/admin/products')
})

router.get('/admin/products/:id/edit',requireAuth, async (req, res) => {
    const product = await productsRepo.getOne(req.params.id)
    if(!product){
        return res.send("product not found")
    }
    res.send(productEditTemplate({product}))
})

router.post(
    '/admin/products/:id/edit',
    requireAuth,
    upload.single('image'),
    [requirePrice, requireTitle],
    handleErrors(productEditTemplate, async (req, res) => {
        const product = await productsRepo.getOne(req.params.id)
        return {product}
    }),
    async (req, res) => {
    const changes = req.body
    if(req.file.buffer){
        changes.image = req.file.buffer.toString('base64')
    }

    try{
        await productsRepo.update(req.params.id, changes)
    }catch(err){
        return res.send("couldn't find item")
    }

     res.redirect('/admin/products')
    })

router.post(
    '/admin/products/:id/delete',
    requireAuth,
    async (req, res) => {
        await productsRepo.delete(req.params.id)
         res.redirect('/admin/products')
    }
    )

module.exports = router;