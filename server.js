const express = require('express'); //Parse response + routing
const session = require('express-session');
const path = require('path');
const http = require('http'); //http module from node.js
const bodyParser = require('body-parser'); //Help parse incoming HTTP requests
const morgan = require('morgan'); //for logging
const expressValidator = require('express-validator'); //validator middleware for user inputs
// const cors = require('cors'); // require cors

const app = express();

const request = require('request');
// *** App Setup middlewares *** - morgan, cors, bodyParser are middlewares.
app.use(morgan('combined')); //morgan logs incoming requests, used for debugging. It shows you how requests are made,etc.
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60000
  }
}));
// app.use(cors()); //Connect cors to the app
app.use(bodyParser.json({ type: '*/*' })); //parse incoming requests to json object (as req.body), to make it easy to handle.
app.use(expressValidator()); // This line has to be just after app.use(bodyParser...).

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build'));
// });

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', (req, res) => {
//   if (req.session.views) {
//     req.session.views++
//     // res.setHeader('Content-Type', 'text/html')
//     // res.write('<p>views: ' + req.session.views + req.session.name + '</p>')
//     // res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     // res.end()
//   } else {
//     req.session.views = 1;
//     // res.end('welcome to the session demo. refresh!')
//   }
//   const name = req.query.name || 'World';
//   res.send({ home: `Hello ${name}!` });
// });

app.get('/api/setSession', (req, res) => {
  req.session.auth=true;
  res.send({ auth: req.session.auth });
});

// Another way to set cookie.
// app.use(function(req, res, next){
//   if(!req.cookies || !req.cookies.foo){
//     res.cookie("foo", "bar");
//   }
//   next();
// });

app.get('/api/getSession', (req, res) => {
  if (req.session.auth) {
    res.send({ auth: req.session.auth });
  } else {
    res.send({ currentSession: false });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next('Page Not Found');
});

const port = 3030;
const server = http.createServer(app);
server.listen(port, () => console.log(`Example app listening on port ${port}!`));
