var express = require('express');
var router = express.Router();
var mysqlSAPI = require("../db/sql");
var Pool = require("../db/dbutil");



router.get('/', function(req, res, next) {
  // 获取连接池
  res.writeHead(200,{"Content-Type":"text/html"})
  res.readFile("./public/dist/index.html","utf-8",(error,data)=>{
    if(error){
      throw  error
    }
    res.end(data);
  })

});

module.exports = router;
