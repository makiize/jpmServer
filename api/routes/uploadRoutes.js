const express = require("express");
const router = express.Router();
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");

const storage = new Storage({
  projectId: "jpm-storage",
  keyFilename:
    "jpm-storage-firebase-adminsdk-t368w-28760fea2c.json"
});

const bucket = storage.bucket("gs://jpm-storage.appspot.com");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});
/**
 * Adding new file to the storage
 */
router.post("/", multer.single("file"), (req, res) => {
  console.log("Upload Image");

  let file = req.file;
  if (file) {
    uploadImageToStorage(file)
      .then(success => {
        res.status(200).send({
          status: "success",
          url: success
        });
      })
      .catch(error => {
        res.status(400).send({
          status: "error"
        });
        console.error(error);
      });
  }
});

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = file => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No image file");
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on("error", error => {
      reject(error);
    });

    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const url =  `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
      
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};
module.exports = router;
