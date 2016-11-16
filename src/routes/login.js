var express = require("express");
var router = express.Router();

router.get('/login',function(request,response){
    if(request.user)
    response.render('loginpage',{user:request.user});
    else
    response.render('loginpage',{user:""});
});

router.post('/login',function(request,response,next){

});

module.exports = router;
