var express = require("express");
var router = express.Router();
var data = require('./data');

router.get('/content',function(request,response){
    var jobnum=request.param("jobnum");
    var conPoint=data.conPoint;
    var jobName=data.jobName;
    var picNum=data.picNum;
    var point = data.point;
    if(request.param("user"))
        response.render('content',{user:request.param("user"),pic:jobName[jobnum],picnum:picNum[jobnum],point:conPoint[jobnum]});
    else
    {
        console.log("content : user 번호가 없어요");
        response.render('content',{user:0,pic:jobName[jobnum],picnum:picNum[jobnum],point:conPoint[jobnum]});
    }
});
router.post('/content*',function(request,response,next){

});

module.exports = router;
