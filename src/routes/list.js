var express = require("express");
var router = express.Router();
var data = require('./data');


router.get('/list',function(request,response){
    var conPoint=data.conPoint;
    var jobName=data.jobName;
    var listnum=4;
    var save=[];
    var place=[];
    var i,j;
    for(i=0;i<listnum;i++)
    {
        save[i]=10000;
        place[i]=0;
    }
    if(request.param("user")) request.user = request.param("user");
    if(request.user)
    {
        if(!data.point[request.user]){data.point[request.user]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];}
        var max=0;
        for(i=0;i<data.conNum;i++)
        {
            var my=data.point[request.user];
            var other=data.conPoint[i];
            var maxx=1;
            var plus=0;
            for(j=0;j<28;j++)
            {
                if(maxx<my[j])maxx=my[j];
            }
            for(j=0;j<28;j++)
            {
                my[j]=my[j]*100/maxx;
                if(other[j]>my[j]) plus+=other[j]-my[j];
                else plus+=my[j]-other[j];
            }
            if(plus<save[max]){
                save[max]=plus;
                place[max]=i;
                for(j=0;j<listnum;j++){
                    if(save[max]<save[j]) max=j;
                }
            }
        }
        console.log("출력할 것 : "+place);
        console.log("그 점수 : "+save);
        response.render('list',{
            user : request.user,
            jobnum : place,
            jobName : jobName,
            listnum : listnum
        });
    }
    else{
        response.render('list',{
            user : 0,
            jobnum : place,
            jobName : jobName,
            listnum : listnum
        });
    }
});


module.exports = router;
