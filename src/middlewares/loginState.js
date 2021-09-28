const mysqlConObj = require('../config/mysql');
const errors      = require('../utils/error');
const resMsg      = require('../utils/responseMssage');
const loginQs     = require('../routes/v1/login/query/login.query');
const stCd        = require('../utils/statusCode');
module.exports={
    updateLoginState:(memberSeq,state,res)=>{
        return new Promise((resolve,reject)=>{
            const db          = mysqlConObj.init();
            db.beginTransaction();
            db.query(loginQs.STATE,[state,memberSeq], function (err, results, fields) {
                console.log("login state result : ", results);
                // state result
                if (err !== undefined && err !== null) {
                    db.rollback();
                    db.end();
                  console.log(err);
                  return false;
                }

                if(results.affectedRows === 0){
                    db.rollback();
                    db.end();
                    console.log("update 실패..");
                    return false;
                }
                db.commit();
                db.end();
                return resolve(results.affectedRows);
            });
        });
    }
}