const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userCollection = require("../models/usersModels");
//====================================

// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// // Load User model
// const { forwardAuthenticated } = require('../config/auth');

// router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// // Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// // Register
// router.post('/register', (req, res) => {
//   const { name, email, password, password2 } = req.body;
//   let errors = [];

//   if (!name || !email || !password || !password2) {
//     errors.push({ msg: 'Please enter all fields' });
//   }

//   if (password != password2) {
//     errors.push({ msg: 'Passwords do not match' });
//   }

//   if (password.length < 6) {
//     errors.push({ msg: 'Password must be at least 6 characters' });
//   }

//   if (errors.length > 0) {
//     res.render('register', {
//       errors,
//       name,
//       email,
//       password,
//       password2
//     });
//   } else {
//     User.findOne({ email: email }).then(user => {
//       if (user) {
//         errors.push({ msg: 'Email already exists' });
//         res.render('register', {
//           errors,
//           name,
//           email,
//           password,
//           password2
//         });
//       } else {
//         const newUser = new User({
//           name,
//           email,
//           password
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(user => {
//                 req.flash(
//                   'success_msg',
//                   'You are now registered and can log in'
//                 );
//                 res.redirect('/users/login');
//               })
//               .catch(err => console.log(err));
//           });
//         });
//       }
//     });
//   }
// });

// // Login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   })(req, res, next);
// });

// // Logout
// router.get('/logout', (req, res) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login');
// });

//===========================================================

router.post("/", (req, res, next) => {
  var _id = new mongoose.Types.ObjectId();
  var uName = req.body.uName;
  var house = req.body.house;
  var phone = req.body.phone;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var Email = req.body.Email;
  var userData = new userCollection({
    _id: _id,
    uName: uName,
    house: house,
    phone: phone,
    username: username,
    password: password,
    password2: password2,
    Email : Email
  });

  if (
    uName == undefined ||
    house == undefined ||
    phone == undefined ||
    username == undefined ||
    password == undefined ||
    password2 == undefined ||
    Email == undefined
  ) {
    res.status(400).send("please defind all information");
  } else {
    userCollection
      .find()
      .exec()
      .then(docs => {
        userData.save();
        res.status(201).send("Create User Successfully");
      });
  }
});
//===================
router.get('/register', (req, res) => {
res.render('signup');
});

router.get('/login', (req, res) => {
res.render('login');
});
//=========================
router.get("/", (req, res, next) => {
  var uid = req.query.uid;
  console.log(uid);
  if (uid == undefined) {
    userCollection
      .find()
      .exec()
      .then(docs => {
        res.status(200).send(docs);
      });
  } else {
    userCollection.find({ _id: uid }, (err, docs) => {
      if (docs == null || docs == "") {
        res.status(404).send("user not fond");
      } else {
        res.status(200).send(docs);
      }
    });
  }
});

router.put("/:uid", (req, res, next) => {
  var uid = req.params.uid;
  var uName = req.body.uName;
  var house = req.body.house;
  var phone = req.body.phone;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var Email = req.body.Email;
  userCollection.findOneAndUpdate(
    { _id: uid },
    {
      $set: {
        uName: uName,
        house: house,
        phone: phone,
        username: username,
        password: password,
        password2: password2,
        Email: Email
      }
    },
    (err, docs) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send(docs);
      }
    }
  );
});

router.delete("/:uid", (req, res, next) => {
  var uid = req.params.uid;
  userCollection.deleteOne({ _id: uid }, (err, docs) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(docs);
    }
  });
});

module.exports = router;
