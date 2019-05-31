let {query} = require('../../config/mysqlContent');
var uuid = require('node-uuid');

//查询所有icon数据
var classify = function(req,res,next){
    var sql = `select * from iconlist`
    query(sql).then((rows) => {
        res.send({code:1,data:rows})
    })
}

//查询到公用的和当前账户下所有的数据信息

var getClassify = function(req,res,next){
    let {uid} = req.query;
    var sql = `select * from classify where (uid='*' or uid='${uid}')`;
    query(sql).then((rows) => {
        res.send({code:1,data:rows})
    })
}

//添加自定义分类

var addClassify = function(req,res,next){
    let {uid,c_type,c_name,c_icon} = req.body;
    var cid = uuid.v1();
    if(!uid || !c_type || !c_name || !c_icon){ 
        res.json({code:4,msg:'缺少参数'})
    }else{
        isHasClassify();
    }

    function isHasClassify(){
        var sql1 = `select * from classify where (uid='*' or uid='${uid}') and c_type='${c_type}' and c_name='${c_name}'`
        query(sql1).then((rows) => {
            console.log(rows)
            if(rows.length > 0){
                res.send({code:3,msg:'此分类已存在'})
            }else{
                
                var sql2 = `insert into classify(cid,uid,c_type,c_name,c_icon) values('${cid}','${uid}','${c_type}','${c_name}','${c_icon}')`;
                query(sql2).then((data) => {
                    console.log(data)
                    if(data.affectedRows == 1){
                        res.send({code:1,msg:'添加成功'})
                    }
                })
            }
        })
    }
}







//需要的sql语句
//select * from iconlist 
//第一步：查询到所有的icon列表
//第二步：查询到公用的和当前账户下的所有的
//第三步：当当前分类不够时，用户点击自定义去添加时：需要获取到用户的id，和选的图标，及分类名称
//以及是在支出还是收入大类下，把以上信息存入数据库中，在此步骤需要判断

module.exports = {
    classify,
    getClassify,
    addClassify
}