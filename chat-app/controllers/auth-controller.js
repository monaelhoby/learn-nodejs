const authModel = require('../models/auth-model');
const validationResult = require('express-validator').validationResult

exports.getSignup = (req, res) => {
    res.render('signup',{
        authError: req.flash("authError")[0],
        validationError: req.flash("vlaidationError"),
        isUser: false,
        pageTitle: 'Signup'
    })
}

exports.postSignup = (req, res, next) => {
    if(validationResult(req).isEmpty()){
        authModel.createNewUser(req.body.name,req.body.email,req.body.password).then(() => {
           res.redirect('/login')
       }).catch(err => {
        req.flash("authError",err)
           res.redirect('/signup')
       })
    }else{
        req.flash("vlaidationError", validationResult(req).array())
        res.redirect('/signup')
    }
}

exports.getLogin = (req, res) => {
    res.render('login',{
        authError: req.flash("authError")[0],
        isUser: false,
        pageTitle: 'Login'
    })
}

exports.postLogin = (req, res) => {
    authModel.login(req.body.email,req.body.password).then(result => {
        // console.log("result-auth-controller", result.userName, result.image)
        req.session.userId = String(result.id);
        req.session.userName= result.userName;
        req.session.userImage= result.image;
        res.redirect('/profile');
    }).catch(err => {
        req.flash("authError", err) // save error in new session
        res.redirect('/login')
    })
}

exports.logout = (req,res, next) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}