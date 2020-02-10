const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const billCollection = require("../models/billModels");

router.post("/", (req, res, next) => {
  var _id = new mongoose.Types.ObjectId();
  var house = req.body.house;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var bill = req.body.bill;
  var by = req.body.by;
  var billData = new billCollection({
    _id: _id,
    house: house,
    firstName: firstName,
    lastName: lastName,
    bill: bill,
    by: by,
    date: Date.now()
      });

  if (
    house == undefined ||
    firstName == undefined ||
    lastName == undefined ||
    bill == undefined ||
    by == undefined
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
/* 
exports.saveMedia = (req, res) => {
        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, (config.const.path.base + config.const.path.productReviewMedia));
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + '-' + file.originalname);
            }
        });

        const upload = multer({storage: storage}).any('file');

        upload(req, res, (err) => {
            if (err) {
                return res.status(400).send({
                    message: helper.getErrorMessage(err)
                });
            }
            let results = req.files.map((file) => {
                return {
                    mediaName: file.filename,
                    origMediaName: file.originalname,
                    mediaSource: 'http://' + req.headers.host + config.const.path.productReviewMedia + file.filename
                }
            });
            res.status(200).json(results);
        });
} */

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
  var house = req.body.house;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var bill = req.body.bill;
  var by = req.body.by;
  billCollection.findOneAndUpdate(
    { _id: billid },
    {
      $set: {
        house: house,
        firstName: firstName,
        lastName: lastName,
        bill: bill,
        by : by
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