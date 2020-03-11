const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const serviceCollection = require("../models/serviceModels");

router.post("/", (req, res, next) => {
  var _id = new mongoose.Types.ObjectId();
  var serTopic = req.body.serTopic;
  var tool = req.body.tool;
  var serDetail = req.body.serDetail;
  var status = req.body.status;
  var location = req.body.location;
  var by = req.body.by;
  var serimg = req.body.serimg;
  console.log(location.lat,location.lon)
  var serviceData = new serviceCollection({
    _id: _id,
    serTopic: serTopic,
    serDetail: serDetail,
    tool: tool,
    by: by,
    status: status,
    serimg: serimg,
    location:location,
    serDate: Date.now()
  });

  if (
    serTopic == undefined ||
    serDetail == undefined ||
    tool == undefined ||
    by == undefined ||
    status == undefined ||
    location == undefined ||
    serimg == undefined
  ) {
    res.status(400).send("please defind all service");
  } else {
    serviceCollection
      .find()
      .exec()
      .then(docs => {
        serviceData.save();
        res.status(201).send("Create service Successfully");
      });
  }
});

router.get("/", (req, res, next) => {
  var serid = req.query.serid;
  console.log(serid);
  if (serid == undefined) {
    serviceCollection
      .find()
      .exec()
      .then(docs => {
        res.status(200).send(docs);
      });
  } else {
    serviceCollection.find({ _id: serid }, (err, docs) => {
      if (docs == null || docs == "") {
        res.status(404).send("service not fond");
      } else {
        res.status(200).send(docs);
      }
    });
  }
});

router.put("/:serid", (req, res, next) => {
  var serid = req.params.serid;
  var serTopic = req.body.serTopic;
  var serDetail = req.body.serDetail;
  var tool = req.body.tool;
  var status = req.body.status;
  var by = req.body.by;
  var location = req.body.location;
  var serimg = req.body.serimg;
  serviceCollection.findOneAndUpdate(
    { _id: serid },
    {
      $set: {
        serTopic: serTopic,
        serDetail: serDetail,
        tool: tool,
        by: by,
        status: status,
        location: location,
        serimg: serimg,
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

router.delete("/:serid", (req, res, next) => {
  var serid = req.params.serid;
  serviceCollection.deleteOne({ _id: serid }, (err, docs) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(docs);
    }
  });
});

module.exports = router;