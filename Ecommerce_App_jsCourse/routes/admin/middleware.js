const { validationResult } = require('express-validator');

module.exports = {
    handleErrors(templateFunc, datacb) {
        return async (req, res, next) => {
            const errors = validationResult(req)
            let data
            if(!errors.isEmpty()){
                if(datacb){
                    data = await datacb(req)
                }
                res.send(templateFunc({errors, ...data}))
            }
            next()
        }
    },
    requireAuth(req, res, next) {
        if(!req.session.userId){
            res.redirect('/signin')
        }
        next()
    }
}