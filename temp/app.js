var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var router = express.Router();



var login = require('./routes/login');
var analysis = require('./routes/analysis');
var list = require('./routes/list');
var content = require('./routes/content');
var data = require('./routes/data');
var userCounter=0;





app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true                    //express 4.0부터 바뀜.
}));

app.use(flash());
app.use(router);

app.use(session({secret:"SECSEC"}));


app.all('/',function(request,response){
    response.render('index.ejs',{user:userCounter++});
});
app.all('/index',function(request,response){
    response.render('index.ejs',{user:userCounter++});
});
app.all('/login',login);
app.all('/analysis',analysis);
app.all('/list',list);
app.all('/content',content);

app.all('/userPoint',function(request,response){
    var i;
    console.log("userPoint - mode :"+request.param("mode"));
    if(!request.user) request.user=request.param("user");
    console.log("userPoint - user : "+request.user);
    console.log("userPoint - pointparam : " + request.param("point"));
    if(request.param("mode")==1)
    {
        if(request.user)
        {
            if(data.point[request.user])
            {
                return data.point;
            }
            else {
                var temp = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
                data.point[request.user]=temp;
                return data.point;
            }
        }
        else return data.point[0];
    }
    else if(request.param("mode")==2)
    {
        if(request.user)
        {
            if(data.point[request.user])
            {
                for(i=0;i<28;i++)
                {
                    data.point[request.user][i]=parseFloat(data.point[request.user][i])+parseFloat(request.param("point")[0][i]);
                }
            }
            else {
                data.point[request.user]=[];
                for(i=0;i<28;i++)
                {
                    data.point[request.user][i]=parseFloat(request.param("point")[0][i]);
                }
            }
        }
        console.log("userpoint : " + data.point[request.user]);
        response.redirect('/list?user='+request.user);
    }
    else if(request.param("mode")==3)
    {
        var jobnum=request.param("jobnum");
        console.log("userPoint - jobnum = " + jobnum);
        if(request.user)
        {
            if(data.point[request.user])
            {
                for(i=0;i<28;i++)
                {
                    data.point[request.user][i]=parseFloat(data.point[request.user][i])+parseFloat(data.conPoint[jobnum][i]/5);
                }
            }
            else {
                data.point[request.user]=[];
                for(i=0;i<28;i++)
                {
                    data.point[request.user][i]=data.conPoint[jobnum][i]/5;
                }
            }
        }
    }

});

app.all('/logout',function(request,response){
    request.logout();
    response.redirect('/');
});



var port = process.env.PORT || 3000;
//heroku와의 연동을 위해서

app.listen(port,function(){
    console.log('surver on!');
});
