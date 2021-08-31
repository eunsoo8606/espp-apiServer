const mysqlConObj = require('../../../../config/mysql');
const resMsg = require('../../../../utils/responseMssage');
const success = require('../../../../utils/success');
const stCd = require('../../../../utils/statusCode');
module.exports = {
    userSelectOne: (memberSeq) =>{
        return new Promise((resolve,reject)=>{
            const db = mysqlConObj.init();
            
            var query = `SELECT *
                         FROM MEMBER 
                         WHERE MEMBER_SEQ = ${memberSeq}`;
            console.log('query : ', query);
            db.query(query, function (err, results, fields) {
               // 회원정보 조회 결과
               if (err || !results || results.length == 0) {
                 return resolve(success.success_json(resMsg.DB_ERROR,err,false));
                 }
                 var user = results[0];
                 console.log("result : ", user)
                 return resolve(success.success_json(resMsg.SUCCESS_REQUEST,user,true));
            });

        })
    }
}