const auth        = require('../../../../middlewares/authorization');
const resMsg      = require('../../../../utils/responseMssage');
const stCd        = require('../../../../utils/statusCode');
const hash        = require('../../../../utils/hashFnc');
const success     = require('../../../../utils/success');
const mysqlConObj = require('../../../../config/mysql');
const errors      = require('../../../../utils/error');

module.exports ={
    login: (email,pwd,res,local)=>{
      const db = mysqlConObj.init();
        var query = `SELECT *
                       FROM MEMBER M
                      WHERE M.EMAIL = '${email}'`;

        return new Promise((resolve, reject)=>{
            db.query(query, function (err, results, fields) {
                // 회원정보 조회 결과
                if (err !== undefined && err !== null) {
                  res.send(errors.error(resMsg.DB_ERROR,'pwd','','DB Error',err));
                  return false;
                }
                  
                if(results.length == 0){
                   resolve(errors.error(resMsg.LOGIN_FIALD,'pwd','','Login Error','USER NOT FOUND..'));
                   return false;
                }

                var user = results[0];
                pwd = hash.sha256_base64(pwd);
                if(user.PWD !== pwd) {
                    res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.LOGIN_FIALD,'pwd','','Login Error','UNAUTHORIZAED USER..'));
                    return  false;
                }

                return resolve(user);
            });
        })
    }        
}