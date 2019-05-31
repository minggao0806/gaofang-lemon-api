var express = require('express');
var router = express.Router();

let {addUsers} = require('./users_api/index')


//用户列表接口
router.get('/api/icon', addUsers);

module.exports = router;
