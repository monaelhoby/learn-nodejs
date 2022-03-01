const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const DB_url = 'mongodb://localhost:27017/online-shop';

const authSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('user', authSchema);

exports.createNewUser = (userName, email,pass) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url).then(() => {
            return User.findOne({email: email})
        }).then((user) => {
            if(user) {
                mongoose.disconnect()
                reject("this email is used");
            }else{
                return bcrypt.hash(pass,10)
            }
        }).then((hashedPass) => {
            let newUser = new User({
                name: userName,
                email: email,
                password: hashedPass
            })
            return newUser.save()
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.login = (email, password) => {
    // check for email
    // no ==> error
    // yes ==> check for password
    // no ==> error
    // yes ==> setSession
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_url).then(() =>User.findOne({email: email})).then((user) => {
            if(!user) {
                mongoose.disconnect()
                reject("email not found");
            }else{
                return bcrypt.compare(password, user.password).then(same => {
                    if(!same) {
                        mongoose.disconnect()
                        reject("password is incorrect")
                    }else{
                        mongoose.disconnect()
                        resolve({
                            id: user._id,
                            isAdmin: user.isAdmin
                        })
                    }
                })
            }
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}