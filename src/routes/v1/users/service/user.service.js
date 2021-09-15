const mysqlConObj   = require('../../../../config/mysql');
const resMsg        = require('../../../../utils/responseMssage');
const success       = require('../../../../utils/success');
const stCd          = require('../../../../utils/statusCode');
const userQs        = require('../query/user.query');
const errors        = require('../../../../utils/error');
module.exports = {
    userSelectOne: (memberSeq) =>{
        return new Promise((resolve,reject)=>{
            const db = mysqlConObj.init();
            
            var query = `SELECT MEMBER_SEQ,EMAIL,NICK_NAME,MEMBER_GROUP,POST,ADDR1,ADDR2
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
    },
    insertUser:(user,res)=>{
        return new Promise((resolve,reject)=>{
            const db = mysqlConObj.init();
            db.beginTransaction();

            db.query(userQs.INSERT,user,function(err,results,fields){
                console.log("result = ", results);
                if (err !== undefined && err !== null) {
                    console.log("init...",err)
                    db.rollback();
                    db.end();
                    res.render("error/error.ejs",{status:stCd.DB_ERROR,message: err.sqlMessage});
                    return false;
                }
                if(results.affectedRows === 0){
                    db.rollback();
                    db.end();
                    res.render("error/error.ejs",{status:stCd.UNAUTHORIZED,message: 'INSERT FAILAD..'});
                    return false;
                }
                db.commit();
                db.end();
                return resolve(results.affectedRows);
            });
        });
    }
}