const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userCollection = require("../models/usersModels");

router.post("/", (req, res, next) => {
  var _id = new mongoose.Types.ObjectId();
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var house = req.body.house;
  var car = req.body.car;
  var phone = req.body.phone;
  var username = req.body.username;
  var password = req.body.password;
  var userData = new userCollection({
    _id: _id,
    firstName: firstName,
    lastName: lastName,
    house: house,
    phone: phone,
    car: car,
    username: username,
    password: password
  });

  if (
    firstName == undefined ||
    lastName == undefined ||
    house == undefined ||
    phone == undefined ||
    car == undefined ||
    username == undefined ||
    password == undefined
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
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var house = req.body.house;
  var car = req.body.car;
  var phone = req.body.phone;
  var username = req.body.username;
  var password = req.body.password;
  userCollection.findOneAndUpdate(
    { _id: uid },
    {
      $set: {
        firstName: firstName,
        lastName: lastName,
        house: house,
        phone: phone,
        car: car,
        username: username,
        password: password
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
