// [START debug]
// Activate Google Cloud Trace and Debug when in production
if (process.env.NODE_ENV === 'production') {
  require('@google/cloud-trace').start()
  require('@google/cloud-debug')
}
// [END debug]

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
const logger = require('morgan')

var login = require('./routes/login');
var analysis = require('./routes/analysis');
var list = require('./routes/list');
var content = require('./routes/content');
var data = require('./routes/data');
var userCounter=0;

const app = express()

var router = express.Router();

app.set('trust proxy', true)

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));



app.use(session({secret:"SECSEC"}));

//app.use(favicon(__dirname + '/../static/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(flash());
app.use(router);

app.all('/*', (req, res, next) => {
    // COURS headers
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,x-appengine-https,x-forwarded-proto')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  } else {
    next()
  }
})

// gae
app.use((req, res, next) => {
  if (req.get('x-appengine-https') === 'on' && !req.get('x-forwarded-proto')) {
    req.headers['x-forwarded-proto'] = 'https'
  }
  next()
})


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
                response.send(data.point);
            }
            else {
                var temp = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
                data.point[request.user]=temp;
                response.send(data.point);
            }
        }
        else response.send(data.point[0]);
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
        response.send(true);
    }

});

app.all('/logout',function(request,response){
    request.logout();
    response.redirect('/');
});


 // 404 Handler
app.use((req, res) => {
  res.status(404).send('404 Not Found')
})

// 500 Handler
app.use((err, req, res) => {
  console.error(err)
  res.status(500).send(err.response || 'Something broke!')
})

// Start the server
if (module === require.main) {
  const server = app.listen(8080, () => {
    console.log('Express server listening on port ' + server.address().port)
  })
}

module.exports = app
