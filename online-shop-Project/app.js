const express = require('express');
const path = require('path');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

const homeRoter = require('./routes/home-routes')
const productRoter = require('./routes/product-route')
const authRoter = require('./routes/auth-route')
const cartRoter = require('./routes/cart-route')
const adminRoter = require('./routes/admin-route')

const app = express();

app.use(express.static(path.join(__dirname, "assets")))
app.use(express.static(path.join(__dirname, "images")))
app.use(flash())

const store = new SessionStore({
    uri: 'mongodb://localhost:27017/online-shop',
    collection: 'sessions'
})

app.use(session({
    secret: "this is secret session",
    saveUninitialized: false,
    store: store,
    // resave: false
}))

app.set('view engine', 'ejs')
app.set("views", "views")

app.use('/', homeRoter)
app.use('/', authRoter)
app.use('/product',productRoter)
app.use('/cart',cartRoter)
app.use('/admin',adminRoter)

app.use('/error',(req, res) => {
    res.redirect('error',{
        isUser: req.session.userId,
        isAdmin: res.session.isAdmin
    })
})

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(3100, () => console.log("server connected"))