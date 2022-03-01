const express = require('express');
const path = require('path');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const SocketIO= require('socket.io')

const homeRoter = require('./routes/home-route')
const authRoter = require('./routes/auth-route')
const profileRoter = require('./routes/profile-route')
const friendRoter = require('./routes/friend-route')
const chatRoter = require('./routes/chat-route')

const getFriendRequests = require('./models/user-model').getFriendRequests


const app = express();
const server = require('http').createServer(app)
const io = SocketIO(server);

io.on('connection', socket => {
    require('./sockets/init-socket')(io, socket)
    require('./sockets/friend-socket')(io, socket)
    require('./sockets/chat-socket')(io, socket)
});

io.onlineUsers = {}

app.use(express.static(path.join(__dirname, "assets")))
app.use(express.static(path.join(__dirname, "images")))
app.use(flash())

const store = new SessionStore({
    uri: 'mongodb://localhost:27017/chat-app',
    collection: 'sessions'
})

app.use(session({
    secret: "this is secret session",
    saveUninitialized: false,
    store: store,
    // resave: false
}))

app.use((req ,res ,next) => {
    if(req.session.userId){
        getFriendRequests(req.session.userId).then((requests)=>{
            req.friendRequests = requests
            next()
        }).catch(err => {
            res.redirect('error')
        })
    }else{
        next()
    }
})

app.set('view engine', 'ejs')
app.set("views", "views")

app.use('/', homeRoter)
app.use('/', authRoter)
app.use('/profile', profileRoter)
app.use('/friend', friendRoter)
app.use('/chat', chatRoter)

app.use('/error',(req, res) => {
    res.redirect('error',{
        isUser: req.session.userId,
        friendRequests: req.friendRequests.friendRequests,
        pageTitle: "Error"
    })
})

app.get('/', (req, res) => {
    res.render('index.ejs',{
        isUser: req.session.userId,
        friendRequests: req.friendRequests.friendRequests,
        pageTitle: "Home"
    })
})

server.listen(3000, () => console.log("server connected"))