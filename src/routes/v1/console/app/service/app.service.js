const errors = require('../../../../../utils/error');
const resMsg = require('../../../../../utils/responseMssage');
const mysqlConObj = require('../../../../../config/mysql');
const app = require('../query/app.query');
const stCd = require('../../../../../utils/statusCode');


module.exports = {
    getAuthApp:(authorizationCode,res) =>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();

            var query = `SELECT MEMBER_SEQ
                           FROM AUTHORIZATION
                          WHERE AUTHORIZATION_CODE = '${authorizationCode}'`;
            db.query(query, function (err, results, fields) {
                //result Check
                if (err || !results || results.length == 0) {
                    res.send(errors.error(resMsg.BAD_REQUEST,'DATABASE ERROR..'));
                    db.end();
                    return false;
                }
                var auth = results[0];
                db.end();
                return resolve(auth);
            });
        });
    },
    selectAppList:(memberSeq,limit, order)=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
            var query = `SELECT APP_NAME,APP_ORIGINAL_FILE_NAME,APP_RENAME_FILE_NAME,APP_SEQ,BUISNESS_NAME,REG_DTTM,FILE_PATH
                           FROM APPLICATION
                          WHERE MEMBER_SEQ = ${memberSeq}
                       ORDER BY APP_SEQ ${order}
                          LIMIT 0, ${limit}`
            console.debug('query : ', query);
            db.query(query, function (err, results, fields) {
                //result Check
                if (err || !results || results.length == 0) {
                    //res.send(errors.error(resMsg.BAD_REQUEST,'ORDER,LIMIT,MEMBER_SEQ',authorizationCode,'QUERY ERROR','NOTFOUND APP..'));
                    db.end();
                    return resolve(err);
                }
                var appList = results;
                db.end();
                return resolve(appList);
            });

        });
    },
    insertApp:(params,res)=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
            db.beginTransaction();
            console.log("query : ", params)
            db.query(app.INSERT,params,function(err,results,fields){
                console.log("result :", results)
                if (err !== undefined && err !== null) {
                    console.log("init...",err)
                    db.rollback();
                    db.end();
                    res.send(errors.error(resMsg.BAD_REQUEST,'APP VALUE',params,'QUERY ERROR',err));
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
        })
    },
    appDetail:(appSeq,res)=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
            db.query(app.SELECT_ONE,appSeq,function(err,results,fields){
                console.log("result :", results)
                if (err !== undefined && err !== null) {
                    console.log("init...",err)
                    db.end();
                    res.send(errors.error(resMsg.BAD_REQUEST,'APP DETAIL SELECT FAILD',params,'QUERY ERROR',err));
                    return false;
                }
                var app = results[0];
                if(app === undefined){
                    db.end();
                    res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.INSERT_FAILD,'APP VALUE','','SELECT Error','SELECT FAILAD..'));
                }
                db.end();
                return resolve(app);
            });
        })
    },
    deleteApp:(param,res)=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
            db.beginTransaction();
            console.log("query : ", param)
            db.query(app.DELETE,param,function(err,results,fields){
                console.log("result :", results)
                if (err !== undefined && err !== null) {
                    console.log("init...",err)
                    db.rollback();
                    db.end();
                    res.send(errors.error(resMsg.BAD_REQUEST,'APP VALUE',param,'QUERY ERROR',err));
                    return false;
                }
                if(results.affectedRows === 0){
                    db.rollback();
                    db.end();
                    res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.INSERT_FAILD,'APP VALUE','','INSERT Error','INSERT FAILAD..'));
                }
                db.commit();
                db.end();
                return resolve(results.affectedRows);
            });
        });
    }
};