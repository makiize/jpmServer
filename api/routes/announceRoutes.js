const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const announceCollection = require("../models/announceModels");

router.post("/", (req, res, next) => {
  var _id = new mongoose.Types.ObjectId();
  var topic = req.body.topic;
  var detail = req.body.detail;
  var img =req.body.img
  var announceData = new announceCollection({
    _id: _id,
    topic: topic,
    detail: detail,
    img: img,
    date: Date.now()
  });

  if (topic == undefined || detail == undefined) {
    res.status(400).send("please defind all announce");
  } else {
    announceCollection
      .find()
      .exec()
      .then(docs => {
        announceData.save();
        res.status(200).json({ status: "Create announce Successfully" });
      });
  }
});

router.get("/", (req, res, next) => {
  var annid = req.query.annid;
  console.log(annid);
  if (annid == undefined) {
    announceCollection
      .find()
      .exec()
      .then(docs => {
        res.status(200).send(docs);
      });
  } else {
    announceCollection.find({ _id: annid }, (err, docs) => {
      if (docs == null || docs == "") {
        res.status(404).send("announce not fond");
      } else {
        res.status(200).send(docs);
      }
    });
  }
});

router.put("/:annid", (req, res, next) => {
  var annid = req.params.annid;
  var topic = req.body.topic;
  var detail = req.body.detail;
  var img = req.body.img;
  announceCollection.findOneAndUpdate(
    { _id: annid },
    {
      $set: {
        topic: topic,
        detail: detail,
        img: img
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

router.delete("/:annid", (req, res, next) => {
  var annid = req.params.annid;
  announceCollection.deleteOne({ _id: annid }, (err, docs) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(docs);
    }
  });
});

module.exports = router;
