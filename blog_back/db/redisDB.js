var redis = require("redis");
var config  = {
    host:"localhost",
    port: 6379,
};

// redis 存储相关操作
const client = redis.createClient(config.port, config.host);
const  clientOper = {
    setKey:(key, value)=>{ // 存储字符串 设置过期时间 默认为 1天
        client.set(key, value);
        client.expire(key, 60*60*24,(error, isSuccess)=>{
            if(isSuccess){
                return true;
            }else{
                return false;
            }
        })
    },
    getValue:(key)=>{ // 获取
       return new Promise((resolve, reject) => {
           client.get(key, function(error, value){
               if(value){
                   resolve(value);
               }else{
                   reject(error);
               }
           });

       })
    },
    deleteKey:(key)=>{
        console.log(key);
        client.del(key);
    }
};

module.exports =  {
    clientOper:clientOper,
    client: client,
};