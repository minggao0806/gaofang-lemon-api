let {query} = require('../../config/mysqlContent');

var uuid = require('node-uuid')

var addUsers = function(req, res, next) {
    // let {pageSize} = req.query;
    // var sql = `select * from iconlist`;
    // query(sql).then((rows) => {
    //   var dataLength = rows.length;
    //   var count = Math.ceil(dataLength/pageSize);
    //   var arr = [];
    //   for(var i = 0;i<count;i++){
    //     arr.push(rows.slice(i*pageSize,(i+1)*pageSize))
    //   }
    //   console.log(arr)
      
    //   res.send({
    //     count : count,
    //     data : arr
    //   })
    // })

    var uid = uuid.v1();
    let {nickname} = req.query;
    var sql = `insert into userlist(uid,nickname) values ('${uid}','${nickname}')`
    query(sql).then((rows) => {
      console.log(rows)
      if(rows.affectedRows == 1){
        res.send({code:1,msg:'登陆成功'})
      }
    })
}

module.exports = {
  addUsers
}