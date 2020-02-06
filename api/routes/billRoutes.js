const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const billCollection = require("../models/billModels");

router.post("/", (req, res, next) => {
  var _id = new mongoose.Types.ObjectId();
  var name = req.body.name;
  var phone = req.body.phone;
  var adminData = new billCollection({
    _id: _id,
    name: name,
    phone: phone,
    
  });

  if (
    name == undefined ||
    phone == undefined
  ) {
    res.status(400).send("please defind all information");
  } else {
    adminCollection
      .find()
      .exec()
      .then(docs => {
        adminData.save();
        res.status(200).send("Create User Successfully");
      });
  }
});

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
}

router.get("/", (req, res, next) => {
  var adminid = req.query.adminid;
  console.log(adminid);
  if (adminid == undefined) {
    adminCollection
      .find()
      .exec()
      .then(docs => {
        res.status(200).send(docs);
      });
  } else {
    adminCollection.find({ _id: adminid }, (err, docs) => {
      if (docs == null || docs == "") {
        res.status(404).send("admin not fond");
      } else {
        res.status(200).send(docs);
      }
    });
  }
});

router.put("/:adminid", (req, res, next) => {
  var adminid = req.params.adminid;
  var name = req.body.name;
  var phone = req.body.phone;
  adminCollection.findOneAndUpdate(
    { _id: adminid },
    {
      $set: {
        name: name,
        phone: phone
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

router.delete("/:adminid", (req, res, next) => {
  var adminid = req.params.adminid;
  adminCollection.deleteOne({ _id: adminid }, (err, docs) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(docs);
    }
  });
});

module.exports = router;