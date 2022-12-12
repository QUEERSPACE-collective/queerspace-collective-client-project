const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
        console.log('reqbody is', req.body);
        console.log('redBody.data is', req.body.data);
    
});

module.exports = router;
