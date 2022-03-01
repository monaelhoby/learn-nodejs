const express = require("express");
const router = express.Router();
router.get('/',(req, res, next) => {
    res.send("About")
});
router.get('/me',(req, res, next) => {
    res.send("About ME")
});
module.exports = router  //export.router = router