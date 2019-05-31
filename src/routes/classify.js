var express = require('express');
var router = express.Router();

let {classify,getClassify,addClassify} = require('./classify_api/index');


//请求全部图标接口
router.get('/api/iconlist',classify);


//请求当前用户接口
router.get('/api/getClassify',getClassify);

//添加自定义分类接口
router.post('/api/addClassify',addClassify)

module.exports = router;