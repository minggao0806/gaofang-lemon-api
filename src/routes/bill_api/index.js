let {query} = require('../../config/mysqlContent');
//添加账单
var addBill = function(req,res,next){
    let {uid,timer,cid,money} = req.body;
    var sql = `insert into bill_list(uid,timer,cid,money) values('${uid}','${timer}','${cid}','${money}')`;
    query(sql).then((rows) => {
        if(rows.affectedRows == 1){
            res.send({code:1,msg:'添加成功'})
        }
    })
}

//查询账单
var getBill = function(req,res,next){
    let {uid,timer,time_type,classify} = req.query;
    //查询月账单
    var sqlMonth = `select b.*,c.c_name,c_icon,c_type from bill_list b,classify c,userlist u where b.uid='${uid}' and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,'%Y-%m')='${timer}' `
    
    //查询年账单语句
    var sqlYear = `select b.*,c.c_name,c_icon,c_type from bill_list b,classify c,userlist u where b.uid='${uid}' and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,'%Y')='${timer}'`

    //按分类查询月账单
    //var sqlClassifyMonth = `select b.*,c.c_name,c_icon,c_type from bill_list b,classify c,userlist u where b.uid='${uid}' and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,'%Y-%m')='${timer}' and c.c_name in ${target}`

    //按分类查询年账单
    //var sqlClassifyYear = `select b.*,c.c_name,c_icon,c_type from bill_list b,classify c,userlist u where b.uid='${uid}' and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,'%Y')='${timer}' and c.c_name in ${target}`
    
    if(!uid || !timer){
        res.send({code:4,msg:'缺少参数'})
    }else{
        var sql;
        if(classify){
            // classify = JSON.parse(classify);
            // var target = '';
            // classify.forEach((i) => {
            //     target += decodeURI(i)
            // })
            
            var sqlClassifyMonth = `select b.*,c.c_name,c_icon,c_type from bill_list b,classify c,userlist u where b.uid='${uid}' and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,'%Y-%m')='${timer}' and c.c_name in (${classify})`

            //按分类查询年账单
            var sqlClassifyYear = `select b.*,c.c_name,c_icon,c_type from bill_list b,classify c,userlist u where b.uid='${uid}' and b.uid=u.uid and b.cid=c.cid and date_format(b.timer,'%Y')='${timer}' and c.c_name in (${classify})`

            sql = time_type == 1 ? sqlClassifyMonth : sqlClassifyYear
        }else{
            sql = time_type == 1 ? sqlMonth : sqlYear
        }
        query(sql).then((rows) => {
            if(rows.length > 0){ 
                res.send({code:1,data:rows})
            }else{
                res.send({code:0,data:'暂无数据'})
            }
        })
    }
}

module.exports = {
    addBill,
    getBill
}