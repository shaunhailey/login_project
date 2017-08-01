const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const data = require('./data.js/data.js')

app.use(cookieParser())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.get('/', function(req, res) {
  res.render('login')
})

app.post('/', (req, res) => {
  req.checkBody('username', 'Eh there mountie, need yer username!').notEmpty()
  const errors = req.validationErrors()
  const username = req.body.username
  const password = req.body.password
  if (errors) {
    res.render('login', { errors })
  } else if ((username, password)) {
    'username' === userData.username
    'password' === userData.password
    res.render('welcome', req.body)
  } else {
    res.render('index', req.body)
  }
})

// //cookie stuff stolen from somewhere
// app.get('/', function(req, res){
//   var html = '<form action="/" method="post">' +
//              'Your name: <input type="text" name="userName"><br>' +
//              '<button type="submit">Submit</button>' +
//              '</form>';
//   if (req.session.userName) {
//     html += '<br>Your username from your session is: ' + req.session.userName;
//   }
//   res.send(html);
// });
//
// app.post('/', function(req, res){
//   req.session.userName = req.body.userName;
//   res.redirect('/');
// });

app.listen(3000, () => {
  console.log('Magic is happening on port 3000')
})
