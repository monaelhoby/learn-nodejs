const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const DB_url = 'mongodb://localhost:27017/chat-app';

const User = require('./user-model').User;

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
                userName: userName,
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
                        resolve(user)
                    }
                })
            }
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}