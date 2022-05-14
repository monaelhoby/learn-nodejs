const express = require('express');
const { validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {handleErrors} = require("./middleware")
const {
  requireEmail, 
  requirePassword, 
  requireConfirmPassword,
  requireEmailExist,
  requirePasswordExist
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  [
    requireEmail, 
    requirePassword, 
    // requireConfirmPassword
  ],
  handleErrors(signupTemplate),
  async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    if (password !== passwordConfirmation) {
      throw new Error('Passwords must match');
    }

    // Create a user in our user repo to represent this person
    const user = await usersRepo.create({ email, password });
    // console.log(user)
    // Store the id of that user inside the users cookie
    req.session.userId = user.id;

    res.redirect('/admin/products')
  }
);

router.get('/signout', (req, res) => {
  req.session = null;
  res.redirect('/signin')
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate({}));
});

router.post('/signin', [
  requireEmailExist,
  requirePasswordExist
], async (req, res) => {
  
  const errors = validationResult(req)
  // console.log(errors)

  if (!errors.isEmpty()) {
    return res.send(signinTemplate({errors}));
  }

  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });

  req.session.userId = user.id;

  return res.redirect('/admin/products')
});

module.exports = router;
