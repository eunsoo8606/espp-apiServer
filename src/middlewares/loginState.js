const mysqlConObj = require('../config/mysql');
const errors      = require('../utils/error');
const resMsg      = require('../utils/responseMssage');
const loginQs     = require('../routes/v1/login/query/login.query');
const stCd        = require('../utils/statusCode');

module.exports={
    updateLoginState:(memberSeq,state,res)=>{
        return new Promise((resolve,reject)=>{
            const db = mysqlConObj.init();
            db.beginTransaction();
            db.query(loginQs.STATE,[state,memberSeq], function (err, results, fields) {
                console.log("login state result : ", results);
                // state result
                if (err !== undefined && err !== null) {
                    db.rollback();
                    db.end();
                  res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.DB_ERROR,err));
                  return false;
                }

                if(results.affectedRows === 0){
                    db.rollback();
                    db.end();
                    res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.REQUEST_FAILD,'affectedRows 0..'));
                    return false;
                }
                console.log("resule : ", results.affectedRows)
                return resolve(results.affectedRows);
            });
        });
    }
}