
const http = require("http");
const body = require("body/form");
const { append } = require("express/lib/response");

http.createServer((req, res) => {
    res.setHeader("Contet-Type", "text/html");

    if(req.method === "GET"){
        res.write("<form action='/' method='POST'>")
        res.write("<input type='text' placholde='UserName' name='UserName'/>")
        res.write("<input type='submit' />");
        res.write("</form>");
        res.end()
    }else if (req.method === "POST"){
        // req.on('data', chunk => {
        //     let body= [];
        //     body.push(chunk)
        // })
        // req.on('end', () => {
        //     body = Buffer.concat(body).toString()
        //     console.log(body);
        //     res.end("done")
        // })

        body(req, (error,body )=> {
            console.log(body)
            res.end("done")
        })
    }
}).listen(3000, () => console.log("Mona"))