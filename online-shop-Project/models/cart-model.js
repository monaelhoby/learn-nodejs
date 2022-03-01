const mongoose = require('mongoose')

const DB_url = 'mongodb://localhost:27017/online-shop';

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timeStamp: Number
});

const CartItem = mongoose.model('cart', cartSchema) ;

exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_url)
            .then(() => {
                let item = new CartItem(data)
                return CartItem.find({productId: item.productId})
                    .then(productItem => {
                        if(productItem[0]){
                        let amount = productItem[0].amount + item.amount;
                        return CartItem.updateOne(
                            {productId: item.productId}, {amount: amount}
                            )
                        }else{
                            return item.save()
                        }
                })
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

exports.getItemByUserId = userId => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_url)
            .then(() => {
                return CartItem.find(
                    {userId: userId},
                    {}, // second param used in projection as filter items
                    {sort: {timeStamp: 1}} // asecending order
                    )
            })
            .then(items => {
                mongoose.disconnect();
                resolve(items)
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })
}

exports.editItem = (cartId, newData) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_url)
            .then(() => {
                return CartItem.updateOne({_id: cartId}, newData)
            })
            .then(items => {
                mongoose.disconnect();
                resolve(items)
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })
}

exports.deleteItem = (cartId) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_url)
            .then(() => {
                return CartItem.deleteOne({_id: cartId})
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

exports.deleteAll = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_url)
            .then(() => {
                return CartItem.deleteMany()
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