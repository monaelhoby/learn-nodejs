
const express = require("express");
const theParser= require('body-parser')
const path = require('path')
const mongoose = require('mongoose')

const app = express();

const db_url = 'mongodb://localhost:27017/firstDB'

let userScema= mongoose.Schema({
    name: String,
    age: Number
})

let User = mongoose.model('User', userScema) // mongoose convert it to users docs in db


//view engine => html files
app.set('view engine', 'ejs')
//set html folders
app.set("views", "views")


app.use(express.static(path.join(__dirname, "views")))

const bodyParserMW= theParser.urlencoded({
    extended: true
})

app.get('/',(req,res,next)=> {
    mongoose.connect(db_url, err => {
        // findById() in mongoose only, findOne()
        User.find({
            // _id: '61f0e23184a2e8ca068a289a'
        },(err, users) => {
            mongoose.disconnect();
            res.render('index',{
                users: users
            })
        })
    })
})

app.post('/', bodyParserMW,(req,res,next)=> {

    //insert user
    // mongoose.connect(db_url, err => {
    //     let newUser = new User({
    //         name: req.body.userName,
    //         age: req.body.age
    //     })
    //     newUser.save((err, result) => {
    //         console.log(result)
    //         mongoose.disconnect()
    //         res.redirect('/')
    //     })
    //     console.log("connect to database")
    // })

     //update user
    //  mongoose.connect(db_url, err => {
    //      User.updateOne({name: req.body.userName}, {
    //          age: req.body.age
    //      }, (err, result) => {
    //         mongoose.disconnect()
    //         res.redirect('/')
    //      })
    //  })

     //delete user
     mongoose.connect(db_url, err => {
        User.deleteOne({name: req.body.userName}, (err, result) => {
           mongoose.disconnect()
           res.redirect('/')
        })
    })
    
})



app.listen(3000, () => console.log("Hello mona"))