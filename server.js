const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cookie = require('cookie')
// const userDirectory = require('./data')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.get('/index', function(req, res) {
  res.render('index', { username: password })
})

app.post('/', (req, res) => {
  req.checkBody('username', 'Eh there mountie, need yer username!').notEmpty()
  const errors = req.validationErrors()
  if (errors) {
    res.render('login', { errors })
  } else {
    res.render('welcome')
  }
})

module.exports.register = function(req, res, next) {
  req.checkBody({
    username: {
      notEmpty: true,
      errorMessage: 'Username is required'
    },

    password: {
      notEmpty: true,
      errorMessage: 'Password is required'
    }
  })

  // req.check('username', 'This username is already taken').isUsernameAvailable()

  req
    .asyncValidationErrors()
    .then(function() {
      next()
    })
    .catch(function(errors) {
      if (errors) {
        return res.json({
          success: false,
          errors: errors
        })
      }
    })
}

app.listen(3000, () => {
  console.log('Magic is happening on port 3000')
})
