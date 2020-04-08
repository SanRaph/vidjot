//1. bring in all installed modules
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

// Load ideas routes
const ideas = require('./routes/ideas');
//Load users routes
const users = require('./routes/users');

//map global promise get rid of warning
mongoose.Promise = global.Promise;


//connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useMongoClient: true
  
})
  .then(() => console.log('mongodb connected...'))
  .catch(err => console.log(err));


//Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


//Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

//method-overrid middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true

}));

// Flash middleware
app.use(flash());

// Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();

});


//4. index route (by handling a get a request)
//always provode the parameter req and res to get  
//properties and methods that have to do with server 
//request and response
app.get('/', (req, res) => {
  //to send something to the browser
  //console.log(req.name);
  //res.send(req.name);
  //res.send('INDEX');

  //const title = 'Welcome';
  res.render('index', {
    // title: title
  });
});


//About Route 
app.get('/about', (req, res) => {
  res.render('About');
})


//use routes, any that partains to /deas goes to the idea file
app.use('/ideas', ideas)

app.use('/users', users)

//it is going to listen on a certain port of 5000
const port = 5000;


//3. take app and call listen method of express and parse  
//in port number and callback
app.listen(port, () => {
  console.log(`server starts on ${port}`);
});