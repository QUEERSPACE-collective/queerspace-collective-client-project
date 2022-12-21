const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const multer = require('multer');
const path = require('node:path');

const storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req,file,cb) {
        cb(null, 'profilePic-' + req.user.id + '.jpg');
    }
});
const upload = multer({
    storage: storage,
});

router.post('/', upload.single("uploaded_file"), function(req,res) {
    console.log('in post router for multer');
    console.log('req.file is', req.file);
    console.log('file path is', req.file.path);
    res.sendStatus(200);

    
});

module.exports = router;