var express = require('express');
var router = express.Router();

let {addBill,getBill} = require('./bill_api/index');

router.post('/api/addBill',addBill);

router.get('/api/getBill',getBill);


module.exports = router;