
const express = require("express");
const theParser= require('body-parser')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

// const about = require("./about")
const app = express();

// MongoClient.connect('mongodb://localhost:27017/', (error, resClient) => {
//     console.log("conneted")
//     let db = resClient.db("firstDB");
//     resClient.close()
// })


//view engine => html files
app.set('view engine', 'ejs')
//set html folders
app.set("views", "views")


app.use(express.static(path.join(__dirname, "views")))
const bodyParserMW= theParser.urlencoded({
    extended: true
})

app.get('/',(req,res,next)=> {
    MongoClient.connect('mongodb://localhost:27017/firstDB', async (error, resClient) => {

    console.log("conneted")
    let db = resClient.db();
    const users = await db.collection('users').find({ //find retun cruser we used toArray to convert it to array
        // _id: new ObjectId('61f0e23184a2e8ca068a289a')
        // age: {
        //     // $lt : ""5",
        //     // $ne: "43" // not in
        //     // $in: [20,10] ,// in range 
        //     // $nin : [6, 30] // not in range
        //     // $or: [{}]
        // },
    },{
        //options
        // limit: 2, // get first 2 docs
        // skip: 2,
        sort: {
            name: 1, //descending
            // age: -1 // ascending
        }
    }).toArray();
    console.log(users);
    res.render('index.ejs',{
        users: users
    });
   
    resClient.close()
    })
})

app.post('/', bodyParserMW,(req,res,next)=> {

    MongoClient.connect('mongodb://localhost:27017/firstDB', async (error, resClient) => {
    console.log("conneted")
    let db = resClient.db();

    // insert user
    // const item = await db.collection("users").insertOne({
    //     name: req.body.userName,
    //     age: +req.body.age,
    // }).then(result => {
    //     console.log("result", result)
    //     res.redirect('/')
    // })

    //update user
    // const item = await db.collection("users").updateOne({
    //     name: req.body.userName
    // },{
    //     $set : {
    //         age: req.body.age
    //     }
    // }).then(() => {
    //     res.redirect('/')
    // })

    //delete suer
    const item = await db.collection("users").deleteOne({
        name: req.body.userName
    }).then(() => {
        res.redirect('/')
    })
    
    resClient.close()
    })
})



app.listen(3000, () => console.log("Hello mona"))