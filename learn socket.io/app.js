const express= require('express');
const { SocketAddress } = require('net');
const path = require('path')

// socket.io works only with http request so i will make http request with express
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('new user connected')

    // how server listen client ?
    // socket.on('clientEvent', (data) => {
    //     console.log('server received', data)
    // })

    // how server emit event to client ??
    //socket.emit  
    //io.emit // all clients
    //socket.broadcast.emit // all clients not this client
    // socket.emit('serverEvent')

    socket.on('joinRoom', () =>{
        io.to('myRoom').emit('msgRecieved')
    })
    socket.on('sendMSG', () => {
        socket.join('myRoom')
    })
})

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(3000, console.log("server connected"))