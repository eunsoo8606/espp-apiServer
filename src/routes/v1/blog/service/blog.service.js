const errors      = require('../../../../utils/error');
const resMsg      = require('../../../../utils/responseMssage');
const blogQs      = require('../query/blog.query');
const mysqlConObj = require('../../../../config/mysql');
const common      = require('../../common/common.vo').common;


module.exports = {
    insert : (data,res) =>{
        return new Promise((resolve, reject)=>{
                var db = mysqlConObj.init();
                db.beginTransaction();
                console.log(" query : ", blogQs.INSERT)
                db.query(blogQs.INSERT,data,function(err,results,fields){
                    if (err !== undefined && err !== null) {
                        console.log("init...",err)
                        db.rollback();
                        db.end();
                        res.send(errors.error(resMsg.BAD_REQUEST,'APP VALUE',data,'QUERY ERROR',err));
                        return false;
                    }
                    if(results.affectedRows === 0){
                        db.rollback();
                        db.end();
                        res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.INSERT_FAILD,'APP VALUE','','INSERT Error','INSERT FAILAD..'));
                        return false;
                    }
                    db.commit();
                    db.end();
                    return resolve(results.affectedRows);
                });
        });
    },
    selectList: (blog,res)=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
            console.log(" query : ", blogQs.LIST(blog.title,blog.content))
            db.query(blogQs.LIST(blog.title,blog.content),common(blog), function (err, results, fields) {
                //result Check
                if (err || !results || results.length == 0) {
                    res.send(errors.error(resMsg.BAD_REQUEST,'ERROR : ',err,'APPLICATION ERROR','BAD REQUEST..'));
                    db.end();
                    return false;
                }
                db.end();
                return resolve(results);
            });
        });
    },
    totalCount: (memberSeq,res)=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
            db.query(blogQs.TOTAL,memberSeq, function (err, results, fields) {
                //result Check
                if (err || !results || results.length == 0) {
                    console.log("err : ", err);
                    res.send(errors.error(resMsg.BAD_REQUEST,err));
                    db.end();
                    return false;
                }
                var count = results[0].COUNT;
                db.end();
                return resolve(count);
            });
        });
    },
    selectOne:(blogSeq,res)=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
     
            db.query(blogQs.SELECTONE,blogSeq, function (err, results, fields) {
                //result Check
                if (err || !results || results.length == 0) {
                    res.send(errors.error(resMsg.BAD_REQUEST,'AuthorizationCode',authorizationCode,'APPLICATION ERROR','BAD REQUEST..'));
                    db.end();
                    return false;
                }
                var result = results;
                db.end();
                return resolve(result);
            });
        });
    },
    deleteBlog:(blogSeq,res)=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
                db.beginTransaction();
                
                console.log(" query : ", blogQs.DELETE)
                db.query(blogQs.DELETE,blogSeq,function(err,results,fields){
                    console.log("result :", results)
                    if (err !== undefined && err !== null) {
                        console.log("init...",err)
                        db.rollback();
                        db.end();
                        res.send(errors.error(resMsg.BAD_REQUEST,'BLOG VALUE',data,'DELETE QUERY ERROR',err));
                        return false;
                    }
                    if(results.affectedRows === 0){
                        db.rollback();
                        db.end();
                        res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.INSERT_FAILD,'BLOG VALUE','','DELETE Error','DELETE FAILAD..'));
                        return false;
                    }
                    db.commit();
                    db.end();
                    return resolve(results.affectedRows);
                });
        });
    },
    update:(blog,res)=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
                db.beginTransaction();
                console.log("blog update query : ", blogQs.UPDATE);
                console.log("blog data : ", blog)
                db.query(blogQs.UPDATE,blog,function(err,results,fields){
                    console.log("result :", results)
                    if (err !== undefined && err !== null) {
                        console.log("init...",err)
                        db.rollback();
                        db.end();
                        res.send(errors.error(resMsg.BAD_REQUEST,'APP VALUE',data,'QUERY ERROR',err));
                        return false;
                    }
                    if(results.affectedRows === 0){
                        db.rollback();
                        db.end();
                        res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.INSERT_FAILD,'APP VALUE','','INSERT Error','INSERT FAILAD..'));
                        return false;
                    }
                    db.commit();
                    db.end();
                    return resolve(results.affectedRows);
                });
        });
    },
    selectBlogTop3:(memberSeq,res)=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
     
            db.query(blogQs.TOP3,memberSeq, function (err, results, fields) {
                //result Check
                if (err || !results || results.length == 0) {
                    res.send(errors.error(resMsg.BAD_REQUEST,'AuthorizationCode',authorizationCode,'APPLICATION ERROR','BAD REQUEST..'));
                    db.end();
                    return false;
                }
                var result = results;
                db.end();
                return resolve(result);
            });
        });
    }
}