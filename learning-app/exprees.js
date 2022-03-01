
const express = require("express");
const theParser= require('body-parser')
const path = require('path')
const MongoClient = require('mongodb').MongoClient

// const about = require("./about")
const app = express();

//view engine => html files
app.set('view engine', 'ejs')
//set html folders
app.set("views", "views")


app.use(express.static(path.join(__dirname, "views")))
const bodyParserMW= theParser.urlencoded({
    extended: true
})

// app.all('/',(req, res, next) => {
//     res.send("Home")
// })
// app.use("/about",about)
// app.use((req, res, next) => {
//     res.send("404 Not Found")
// })


app.get('/',(req,res,next)=> {
    // res.setHeader("Contet-Type", "text/html");
    // res.write("<form action='/' method='POST'>")
    // res.write("<input type='text' placholde='UserName' name='UserName'/>")
    // res.write("<input type='submit' />");
    // res.write("</form>");
    //res.sendFile(path.join(__dirname,"views","index.html")) // to send static html
    console.log(req.query)
    res.render('index.ejs',{
        pagTitle: "Learning Nodejs"
    }) // to send dynamic html template
    // res.end()
})

app.post('/', bodyParserMW,(req,res,next)=> {
    console.log(req.body) // body is in bodyPaserMW
    res.render('index',{
        name: req.body.userName,
        age: req.body.age,
        pagTitle: "Learning Nodejs"
    })
    // res.end("done")
})

app.get('/:name',(req,res,next)=> {
    res.render('index',{
        pagTitle: req.params.name,
        name: req.params.name,
    })
})



app.listen(3000, () => console.log("Hello mona",path.join(__dirname, "views","index.css")))