module.exports = {
     getError(errors, prop) {
        // props = email || password || passswordConfirmtion
        try {
          return errors.mapped()[prop].msg
        } catch(err){
          return ''
        }
        // errors.mapped === {email : {msg : }, password : {}, passwordConfirm : {}}
      }
}