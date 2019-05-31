let { mysqlOption } = require("./config.js")
let mysql = require("mysql")

var connection = mysql.createPool(mysqlOption);

function query(sql) {
    return new Promise((resolve, reject) => {
        //2、从连接池中获取一条连接
        connection.getConnection((err, connect) => {

            connect.query(sql, (sqlerr, rows, fields) => {
                if (sqlerr) {
                    reject(sqlerr)
                    return
                }
                resolve(rows)
                    //释放连接
                connect.release()
            })
        });
    })
}
module.exports = {
    query
}