// database operations 

const mongoose = require('mongoose')

const DB_url = 'mongodb://localhost:27017/online-shop';

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
})

const productModel = mongoose.model('product', productSchema)

exports.getAllProducts = () => {
    //connect db
    //get product
    //close connection

    // make new promise to use reutrned value outside file in another func.
    //i make new promise to controll it by myself
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url).then(() => {
            return productModel.find()
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getProductsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url).then(() => {
            return productModel.find({category:category})
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
            // console.log("products",products)
        }).catch(err => reject(err))
    })
}

exports.getProductByID = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url).then(() => {
            return productModel.findById(id)
        }).then(product => {
            mongoose.disconnect()
            resolve(product)
            // console.log(product)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getFirstProduct = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url).then(() => {
            return productModel.findOne({})
        }).then(product => {
            mongoose.disconnect()
            resolve(product)
            // console.log(product)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.addProduct = (data) => {
    return new Promise((resolve, reject) => {
        mongoose
        .connect(DB_url)
        .then(() => {
            let theProduct = new productModel(data)
            return theProduct.save()
        })
        .then(() => {
            mongoose.disconnect();
            resolve()
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}

exports.deleteProduct = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_url)
            .then(() => {
                console.log("id",productModel)
                return productModel.deleteOne({_id: id})
            })
            .then((data) => {
                console.log("data",data)
                mongoose.disconnect();
                resolve()
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })
}