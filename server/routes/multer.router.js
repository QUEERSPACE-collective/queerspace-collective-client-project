const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


const AWS = require('aws-sdk');
const {S3Client} = require('@aws-sdk/client-s3');
const app = express();
const multer = require('multer');
const multerS3 = require('multer-s3');
const bucketName = process.env.AWS_BUCKET_NAME;
const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
        key: function (req,file, cb) {
          console.log('file is', file)
      cb(null, 'profilePic-' + req.user.id + file.originalname)
    }
    })
});

app.post('/upload', rejectUnauthenticated, upload.array('photos',3), 
function(req, res, next) {
  res.send('Successfully uploaded ' + req.files.length + ' files!')
  // console.log(req);
  console.log(req.file, 'is the req.file');
  if (req.file == null) {
      return res.status(400).json({ 'message': 'Please choose the file' })
   }

})

const storage = multer.diskStorage({
    destination: './public/images/profilePics',
    filename: function (req,file,cb) {
        cb(null, 'profilePic-' + req.user.id + '.jpg');
    }
});

// PUT updated profile picture
router.put('/', rejectUnauthenticated, upload.single("uploaded_file"), function(req,res) {
    console.log('in post router for multer');
    console.log('what is current users ID?: ',req.user.id)
    console.log('req.file is', req.file);
    console.log(`../images/profilePics/${req.file.location}`);
    let pPic = `${req.file.location}`;
    let sqlText = 
        `UPDATE "user" 
         SET "profilePic" = $1
         WHERE "user"."id" = $2;`
         const sqlParams = [
            pPic,
            req.user.id
         ];
         pool.query(sqlText, sqlParams)
         .then((dbRes) => {
           res.sendStatus(200);
         })
         .catch((err) => {
           console.log(`Error in image PUT `, err);
           res.sendStatus(500);
         })
});

module.exports = router;