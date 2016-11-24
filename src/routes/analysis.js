var express = require("express");
var router = express.Router();
var data = require('./data');

router.get('/analysis',function(request,response){
    var point = data.point;
    var user;
    if(request.param("user"))
    user = request.param("user");
    else user = 0;
    var title=["실재적 유형","탐구적 유형","예술적 유형","사회적 유형","기업적 유형","관습적 유형",
    "성취/노력","융통성/유연함","분석적 생각","꼼꼼함","배려깊음","협력","Dependability","Independence(Work Style)","Initiative","Innovation","Integrity","Leadership","Persistence","Self Control","Social Orientation","Stress Tolerance",
    "Achievement","Independence (Work Value)","Recognition","Relationships","Support","Working Conditions"];
    var Interest=[];
    var WorkStyles=[];
    var WorkValues=[];
    var desc=["기계적 적성이 높은 유형으로 말수가 적은 편이고, 남성적이며, 솔직하고,소박하고 , 단순한 성격이다. 기술 기계 장치에 소질이 있다.",
    "과학적 적성이 높은 유형으로 생각이 많고, 공부를 좋아한다. 논리적 , 분석적, 합리적이며 신중하다. 학문 탐구나 이론적 부분을 중요하게 여긴다.",
    "창의적 적성이 높은 유형으로 상상력, 감수성이 풍부하며, 자유분방하며, 독창적, 개방적이고 개성이 강하다. 자유, 개성을 추구한다.",
    "사람을 헌신적으로 보살펴 주고, 도와주고, 어울리기 좋아하며 친절하고 정이 많아서 이타심이 많고, 희생적이다.",
    "언어적성이 높은 유형으로 지배력, 통솔력, 지도력이 있으며, 말을 잘하고, 주장적, 설득적 이며, 경쟁적, 야심적이다.",
    "정확하고, 빈틈없고 책임감이 강하다. 또한 조심성과 계획성이 있고 원리원칙주의며 보수적이다. 안전, 완벽을 추구한다.",];
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
    min=0;
    max=1;
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
    min=0;
    max=1;
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
        Interest[i]={key:title[i],value:point[user][i],desc:desc[i]};
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
