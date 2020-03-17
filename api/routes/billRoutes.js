const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const billCollection = require("../models/billModels");

router.post("/", (req, res, next) => {
  var _id = new mongoose.Types.ObjectId();
  var bHouse = req.body.bHouse;
  var bName = req.body.bName;
  var bill = req.body.bill;
  var billData = new billCollection({
    _id: _id,
    bHouse: bHouse,
    bName: bName,
    bill: bill,
    date: Date.now()
      });

  if (
    bHouse == undefined ||
    bName == undefined ||
    bill == undefined 
  ) {
    res.status(400).send("please defind all bill");
  } else {
    billCollection
      .find()
      .exec()
      .then(docs => {
        billData.save();
        res.status(200).send("Create bill Successfully");
      });
  }
});

router.get("/", (req, res, next) => {
  var billid = req.query.billid;
  console.log(billid);
  if (billid == undefined) {
    billCollection
      .find()
      .exec()
      .then(docs => {
        res.status(200).send(docs);
      });
  } else {
    billCollection.find({ _id: billid }, (err, docs) => {
      if (docs == null || docs == "") {
        res.status(404).send("bill not fond");
      } else {
        res.status(200).send(docs);
      }
    });
  }
});

router.put("/:billid", (req, res, next) => {
  var billid = req.params.billid;
  var bHouse = req.body.bHouse;
  var bName = req.body.bName;
  var bill = req.body.bill;
  billCollection.findOneAndUpdate(
    { _id: billid },
    {
      $set: {
        bHouse: bHouse,
        bName: bName,
        lastName: lastName,
        bill: bill
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

router.delete("/:billid", (req, res, next) => {
  var billid = req.params.billid;
  billCollection.deleteOne({ _id: billid }, (err, docs) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(docs);
    }
  });
});

module.exports = router;