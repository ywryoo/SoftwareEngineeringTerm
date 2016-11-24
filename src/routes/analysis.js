var express = require("express");
var router = express.Router();
var data = require('./data');

router.get('/analysis',function(request,response){
    var point = data.point;
    var user;
    if(request.param("user"))
    user = request.param("user");
    else user = 0;
    var title=["Realistic","Investigative","Artistic","Social","Enterprising","Conventional",
    "Achievement/Effort","Adaptability/Flexibility","Analytical Thinking","Attention to Detail","Concern for Others","Cooperation","Dependability","Independence(Work Style)","Initiative","Innovation","Integrity","Leadership","Persistence","Self Control","Social Orientation","Stress Tolerance",
    "Achievement","Independence (Work Value)","Recognition","Relationships","Support","Working Conditions"];
    var Interest=[];
    var WorkStyles=[];
    var WorkValues=[];
    var i;
    var min=0;
    var max=1;
    for(i=0;i<6;i++)
    {
        if(max<point[user][i])max=point[user][i];
        if(min>point[user][i])min=point[user][i];
    }
    for(i=0;i<6;i++)
    {
        point[user][i]-=min;
        point[user][i]/=(max-min);
        point[user][i]*=100;
        point[user][i]=parseInt(point[user][i]);
    }
    for(i=0;i<16;i++)
    {
        if(max<point[user][i+6])max=point[user][i+6];
        if(min>point[user][i+6])min=point[user][i+6];
    }
    for(i=0;i<16;i++)
    {
        point[user][i+6]-=min;
        point[user][i+6]/=(max-min);
        point[user][i+6]*=100;
        point[user][i+6]=parseInt(point[user][i+6]);
    }
    for(i=0;i<6;i++)
    {
        if(max<point[user][i+22])max=point[user][i+22];
        if(min>point[user][i+22])min=point[user][i+22];
    }
    for(i=0;i<6;i++)
    {
        point[user][i+22]-=min;
        point[user][i+22]/=(max-min);
        point[user][i+22]*=100;
        point[user][i+22]=parseInt(point[user][i+22]);
    }

    for(i=0;i<6;i++)
    {
        Interest[i]={key:title[i],value:point[user][i]};
    }
    for(i=0;i<16;i++)
    {
        WorkStyles[i]={key:title[6+i],value:point[user][6+i]};
    }
    for(i=0;i<6;i++)
    {
        WorkValues[i]={key:title[22+i],value:point[user][22+i]};
    }
    var InterestSort = Interest.slice(0).sort(function(a, b) {return b.value - a.value;});
    var WorkStylesSort=WorkStyles.slice(0).sort(function(a, b) {return b.value - a.value;});
    var WorkValuesSort=WorkValues.slice(0).sort(function(a, b) {return b.value - a.value;});
    response.render('analysis',{user:user,interest:InterestSort,workst:WorkStylesSort,workval:WorkValuesSort});
});


module.exports = router;
