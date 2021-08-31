const mysqlConObj = require('../../../../../config/mysql');
const resMsg      = require('../../../../../utils/responseMssage');
const error       = require('../../../../../utils/error').error;
const stCd        = require('../../../../../utils/statusCode');
const query       = require('../query/query');
const vo          = require('../vo/movie.vo').movie;

module.exports = {
    selectList:(res)=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
            db.query(query.LIST,(err,result)=>{
                if (err !== undefined && err !== null) {
                    res.send(error(resMsg.DB_ERROR,'pwd','','DB Error',err));
                    return false;
                }
                var movieList = results;
                if(app === undefined){
                    db.end();
                    res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.INSERT_FAILD,'APP VALUE','','SELECT Error','SELECT FAILAD..'));
                }
                db.end();
                return resolve(movieList);
            });

        });
    },
    insert:(res,data)=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
            db.beginTransaction();
            var results = 0;
            
            data.forEach((item)=>{
            db.query(query.INSERT,vo('LO',item.img,item.rank,item.title,item.rate,item.star),(err,result)=>{
                if (err !== undefined && err !== null) {
                    console.log("error init..")
                    db.rollback();
                    db.end();
                    reject(error(resMsg.DB_ERROR,'pwd','','DB Error',err));
                    return false;
                }

                if(result.affectedRows == 0){
                    db.rollback();
                    db.end();
                    reject(errors.error(resMsg.INSERT_FAILD,'APP VALUE','','SELECT Error','SELECT FAILAD..'));
                    return false;
                }
                results += result.affectedRows;

                if(results == data.length){
                    db.commit();
                    db.end();
                    return resolve(results);
                }
            });
        });

        });
    },
    delete:()=>{
        return new Promise((resolve,reject)=>{
            var db = mysqlConObj.init();
            db.beginTransaction();
            db.query(query.DELETE,(err,result)=>{
                if (err !== undefined && err !== null) {
                    console.log("error init..")
                    db.rollback();
                    db.end();
                    reject(error(resMsg.DB_ERROR,'pwd','','DB Error',err));
                    return false;
                }
                db.commit();
                db.end();
                return resolve(result.affectedRows);
            });
        });
    }
}