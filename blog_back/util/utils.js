const jwt = require("jsonwebtoken");
var client = require("../db/redisDB");
const  CommonJson = (res, obj)=>{
    let objs = {
        message: obj.message || "",
        status: obj.status || "", // 200 success 401 无权限 403 token 过期
        data: obj.data || "",
        code: obj.code || "", // 0-success, 1 低级错误  2 严重错误 3 无权限 4 token 过期
    };
    res.json(objs);
};

const JsonApi = {

    SuccessJson:(res, data)=>{
        let obj = {
            message: "success",
            status: "200", // 200 success 401 无权限 403 token 过期
            data: data,
            code: 0,
        };
        CommonJson(res, obj);
    },
    FailJson:(res, error,status, level)=>{
        let obj = {
            message: error,
            status: status, // 200 success 401 无权限 403 token 过期
            data: "",
            code: level,
        };
        CommonJson(res, obj);
    },
    ServerJson:(res,level)=>{
        let obj = {
            message: "服务器错误",
            status: "500", // 200 success 401 无权限 403 token 过期
            data: "",
            code: level,
        };
        CommonJson(res, obj);
    },
    Json404:(res, level)=>{
        let obj = {
            message: "网页不存在",
            status: "404", // 200 success 401 无权限 403 token 过期
            data: "",
            code: level,
        };
        return CommonJson(res, obj);
    }
};

const Token = {
    setToken : (key,expires, strTimer)=>{ // 设置token
        let token = jwt.sign({
            key:key
        },key,{
            expiresIn: `${expires} ${strTimer}`,
        });
        client.clientOper.setKey(`Token_${key}`, token);
    },
    getToken :(key)=>{ // 获取token

    },
    verifyToken:(token, key)=>{ // 验证token
        let verify = jwt.verify(token, key, (error, ecoded)=>{
            if(ecoded){
                return ecoded
            }else{
                return "Token Invalid"
            }
        });
        return verify;
    }
};
module.exports = {
    JsonApi:JsonApi,
    Toke: Token,
};