
var mysql = require("mysql");
var config = require("./inner");
// 创建连接池
var pool = mysql.createPool(config.mysqlConfig);

iml = {
    // 封装查询操作
    query: (sql, params)=>{
        // 使用 Promise 异步
        return new Promise((resolve, reject) => {
            // 获取链接
            pool.getConnection((error, connect)=>{
                if(error) return reject(error);
                 // 查询表数据
                connect.query(sql, params, (err, result)=>{
                    if(err) return reject(err);
                    connect.release();
                    return resolve(result);
                })
            })
        })
    },
    redis_expire:(client, key, value)=>{ // redis 设置过期时间
        client.expire(key, value, (error, isSuccess)=>{
            if(isSuccess){
                return true
            }else{
                return false
            }
        })
    }
};

module.exports.Pool = iml;

