var express = require("express");
var router = new express.Router();

var util = require("../util/utils");
var sqlApi = require("../db/sql");
var sqlQuery = require("../db/dbutil");
var crypto = require("crypto");
var client = require("../db/redisDB");
// 登录请求
let setPassword = (pwd)=>{ // 密码加密
    /**
     * 返回新的密码
     * @type {Hash}
     */
    let md5 = crypto.createHash("md5");
    let newPassword = md5.update(pwd).digest("hex") ;
    return newPassword;
};

router.post("/login", (req,res,next)=>{ // 登录
    // console.log(req.body.isthree);
    if(req.body.isthree == 1){
        let username = req.body.username;
        if(!username){
            // res.status = "404";
            return util.JsonApi.Json404(res,1)
        }
        // 查询用户是否存在  对比密码
        sqlQuery.Pool.query(sqlApi.SqlApi.SELECT_USER_THREE,[username, req.body.isthree]).then(data=>{
            let sendData = {};
            if(data.length !==0){
                // console.log(data);
                    util.Toke.setToken(username, "1", "days");
                    client.client.get(`Token_${username}`, (error, value)=>{ // 获取Token
                        if(value){
                            sendData["Token"] = value;
                            sendData["user"] = data[0];
                            return util.JsonApi.SuccessJson(res, sendData);
                        }else{
                            return util.JsonApi.FailJson(res,error, "401","2");
                        }
                    });
            }else {
                let newpwd = "null";
                sqlQuery.Pool.query(sqlApi.SqlApi.INSERT_USER_THREE, [username, newpwd,"1"]).then(data=>{ // 插入数据库
                    if(data){
                        let sendData = {};
                        util.Toke.setToken(username, "1", "days");
                        client.client.get(`Token_${username}`, (error, value)=>{ // 获取Token
                            if(value){
                                sqlQuery.Pool.query(sqlApi.SqlApi.SELECT_USER_TABLE,[username]).then(datas=>{
                                    if(datas){
                                        sendData["Token"] = value;
                                        sendData["user"] = datas[0];
                                        return util.JsonApi.SuccessJson(res, sendData);
                                    }else {
                                        return util.JsonApi.FailJson(res,"用户名存在","500", 2);
                                    }
                                }).catch(error=>{
                                    res.status = "500";
                                    return util.JsonApi.FailJson(res,error,"500", 2);
                                })
                            }else{
                                return util.JsonApi.FailJson(res,error, "401","2");
                            }
                        });
                    }
                }).catch(error=>{ // 捕获异常
                    res.status = 500;
                    // console.log(error);
                    return util.JsonApi.FailJson(res,"用户名存在","500", 2);
                });
            }
        }).catch(error=>{
            res.status = "500";
            // console.log(error);
            return util.JsonApi.FailJson(res,error,"500", 2);
        })
    }else if(req.body.isthree == "0"){
        let username = req.body.username;
        let password = req.body.password;
        if(!username || !password){
            // res.status = "404";
            return util.JsonApi.Json404(res,1)
        }
        let newpwd = setPassword(password);
        // 查询用户是否存在  对比密码
        sqlQuery.Pool.query(sqlApi.SqlApi.SELECT_USER_TABLE,[username]).then(data=>{
            let sendData = {};
            // console.log(data);
            if(data.length !==0){
                if(data[0].user_password == newpwd){
                    util.Toke.setToken(username, "1", "days");
                    client.client.get(`Token_${username}`, (error, value)=>{ // 获取Token
                        if(value){
                            sendData["Token"] = value;
                            sendData["user"] = data[0];
                            return util.JsonApi.SuccessJson(res, sendData);
                        }else{
                            return util.JsonApi.FailJson(res,error, "401","2");
                        }
                    });
                }else {
                    return util.JsonApi.FailJson(res, "密码错误", 400, 1);
                }
            }else {
                return util.JsonApi.FailJson(res, "用户名错误",400,1);
            }
        }).catch(error=>{
            res.status = "500";
            // console.log(error);
            return util.JsonApi.FailJson(res,error,"500", 2);
        })
    }



});
router.post("/register", (req, res, next)=>{ // 注册
   let username = req.body.username;
   let password = req.body.password;
   let isthree = req.body.isthree;
   if(!username || !password){
       res.status = 404;
       return util.JsonApi.FailJson(res, "参数错误", 404, 1);
   }
   let newpwd = setPassword(password);
   sqlQuery.Pool.query(sqlApi.SqlApi.INSERT_USER_TABLE, [username, newpwd,isthree]).then(data=>{ // 插入数据库
      console.log(data);
       if(data){
          let sendData = {};
          util.Toke.setToken(username, "1", "days");
          client.client.get(`Token_${username}`, (error, value)=>{ // 获取Token
              if(value){
                  sqlQuery.Pool.query(sqlApi.SqlApi.SELECT_USER_TABLE,[username]).then(datas=>{
                      if(datas){
                          sendData["Token"] = value;
                          sendData["user"] = datas[0];
                          return util.JsonApi.SuccessJson(res, sendData);
                      }else {
                          return util.JsonApi.ServerJson(res, 2);
                      }
                  }).catch(error=>{
                      res.status = "500";
                      // console.log(error);
                      return util.JsonApi.FailJson(res,error,"500", 2);
                  })
              }else{
                  return util.JsonApi.FailJson(res,error, "401","2");
              }
          });
      }
   }).catch(error=>{ // 捕获异常
       res.status = 500;
       return util.JsonApi.FailJson(res, "用户名已存在",400,1)
   });
});


router.get("/logout", (req,res,next)=>{
    let username = req.query.username;
    client.clientOper.deleteKey(`Token_${username}`);
    util.JsonApi.SuccessJson(res, {});
});
module.exports = router;


