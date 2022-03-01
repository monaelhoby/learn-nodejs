const express= require('express');
const jwt = require('jsonwebtoken')


const app = express();

const jwt_secret = "this is jwt for app";

// setHeaders for CORS (cross origin resources sharing) policy
// if you make web application you mus use api_key not CORS policy
app.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization')
    next()
})

app.get('/', (req, res, next) => {
    // res.json({
    //     name: "mona",
    //     age: 30
    // })
    let token = jwt.sign({
        name: 'mona',
        age: 30
    }, jwt_secret,{
        expiresIn: '1h'
    });

    res.json({
        token: token
    })
})

app.post('/', (req, res, next) => {
    let token = req.header("Authorization"); // name of header to return data
    try{
        let data = jwt.verify(token,jwt_secret) // return data if is true
        res.json({
            data: data
        })
    }catch(err){
        res.json({
            user: false
        })
    }
})


app.listen(3000, console.log("server conneted"))