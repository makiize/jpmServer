const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const adminCollection = require("../models/adminModels");

router.post("/", (req, res, next) => {var _id = new mongoose.Types.ObjectId();
  var addName = req.body.addName;
  var addPhone = req.body.addPhone;
  var addUsername = req.body.addUsername;
  var addPassword = req.body.addPassword;
  var adminData = new adminCollection({
    _id: _id,
    addName: addName,
    addPhone: addPhone,
    addUsername: addUsername,
    addPassword: addPassword
  });

  if (
    addName == undefined ||
    addPhone == undefined ||
    addUsername == undefined ||
    addPassword == undefined
  ) {
    res.status(400).send("please defind all information");
  } else {
    adminCollection
      .find()
      .exec()
      .then(docs => {
        adminData.save();
        res.status(201).send("Create admin Successfully");
      });
  }
});

/* exports.saveMedia = (req, res) => {
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
 */
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
  var addName = req.body.addName;
  var addPhone = req.body.addPhone;
  var addUsername = req.body.addUsername;
  var addPassword = req.body.addPassword;
  adminCollection.findOneAndUpdate(
    { _id: adminid },
    {
      $set: {
        addName: addName,
        addPhone: addPhone,
        addUsername: addUsername,
        addPassword: addPassword
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
