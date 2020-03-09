const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require('method-override');

const userRoutes = require("./api/routes/usersRoutes");
const announceRoutes = require("./api/routes/announceRoutes");
const adminRoutes = require("./api/routes/adminRoutes");
const serviceRoutes = require("./api/routes/serviceRoutes");
const uploadRoutes = require("./api/routes/uploadRoutes"); 
const billRoutes = require("./api/routes/billRoutes");




const dburl = 'jpm-db';
// const dburl = '134.209.100.0:27017'


mongoose.connect(
  "mongodb://"+dburl+"/jpmDB",
  function(err) {
    if (err) throw err;
    console.log("conect to mongoDB " +dburl+" Successful");
  }
);

//========================================================
// Middleware
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
// app.get('/home',function(req,res){
//   res.render('welcome');
// });

//==========================================================

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }

  next();
});

app.use(express.static("uploads"));
app.use("/users", userRoutes);
app.use("/announce", announceRoutes);
app.use("/admin", adminRoutes);
app.use("/service", serviceRoutes);
app.use("/file", uploadRoutes);
app.use("/bill",billRoutes);
app.use('/',require('./api/routes/index'));

app.use("/healty", (req, res, next) => {
  res.status(200).send("server is healty");
});
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message }
  });
});

app.use('/static',express.static('web'));   //set folder web is static
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '/index.html'));
});


// const expressLayouts = require('express-ejs-layouts');
// const passport = require('passport');
// const flash = require('connect-flash');
// const session = require('express-session');


// // Passport Config
// require('./config/passport')(passport);



// // EJS
// app.use(expressLayouts);
// app.set('view engine', 'ejs');

// // Express body parser
// app.use(express.urlencoded({ extended: true }));

// // Express session
// app.use(
//   session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
//   })
// );

// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Connect flash
// app.use(flash());

// // Global variables
// app.use(function(req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });

// // Routes
// app.use('/', require('./api/routes/index'));
// app.use('/users', require('./api/routes/usersRoutes'));

module.exports = app;
