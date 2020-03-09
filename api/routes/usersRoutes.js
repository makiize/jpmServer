const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userCollection = require("../models/usersModels");

router.get("/login",(req,res)=> res.render('login'));

router.get("/register",(req,res)=> res.render('register'));

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
