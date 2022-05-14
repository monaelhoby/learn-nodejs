const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');


module.exports = {
    requireTitle: 
        check('title')
        .trim()
        .isLength({min: 5, max: 40})
        .withMessage("Must Be Valid Title")
    ,
    requirePrice: 
        check('price')
        .trim()
        .toFloat()
        .isFloat({min: 1})
        .withMessage("Must Be Valid Price")
    ,
    requireEmail : 
        check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("Must Be Valid Email")
        .custom(async (email) => {
        const existingUser = await usersRepo.getOneBy({ email });
        if (existingUser) {
            throw new Error('Email in use');
        }
        }),
    requirePassword :
        check('password')
        .trim()
        .isLength({min : 6, max:15})
        .withMessage("Password must be between 6 and 15"),
    requireConfirmPassword :
        check('passwordConfirmation')
        .trim()
        .isLength({min : 6, max:15})
        .withMessage("password doesn't match")
        .custom((passwordConfirmation, { req }) => {
            if(passwordConfirmation !== req.body.password){
                throw new Error(("password Must match"))
            }
        }),
    requireEmailExist:
        check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .custom( async (email) => {
            const user = await usersRepo.getOneBy({ email })
            if (!user) {
            throw new Error('Email not found');
            }
        }),
    requirePasswordExist:
        check('password')
        .trim()
        .isLength({min:6, max: 18})
        .custom(async (password, {req}) => {
            const user = await usersRepo.getOneBy({ email: req.body.email })
            // if (!user) {
            //     throw new Error('Invalid password');
            // }
            const validPassword = await usersRepo.comparePasswords(
            user.password,
            password
            );
            if (!validPassword) {
                throw new Error('Invalid password');
            }
        })
}
