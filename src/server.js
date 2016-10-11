// [START debug]
// Activate Google Cloud Trace and Debug when in production
if (process.env.NODE_ENV === 'production') {
  require('@google/cloud-trace').start()
  require('@google/cloud-debug')
}
// [END debug]

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')

const app = express()

app.set('trust proxy', true)
app.set('view engine', 'pug')
app.set('views', __dirname + '/templates')

//app.use(favicon(__dirname + '/../static/favicon.ico'))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '../static'))


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


app.use('/', (req, res) => {
  res.render('main')
})

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
