const resMsg      = require('../../../../utils/responseMssage');
const stCd        = require('../../../../utils/statusCode');
const hash        = require('../../../../utils/hashFnc');
const mysqlConObj = require('../../../../config/mysql');
const errors      = require('../../../../utils/error');
const logState    = require('../../../../middlewares/loginState');

module.exports ={
    login: (email,pwd,res)=>{
      const db = mysqlConObj.init();
        var query = `SELECT *
                       FROM MEMBER M
                      WHERE M.EMAIL = '${email}'`;

        return new Promise((resolve, reject)=>{
            db.query(query, function (err, results, fields) {
                console.log("results : ", results);
                // 회원정보 조회 결과
                if (err !== undefined && err !== null) {
                  res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.DB_ERROR,err));
                  return false;
                }
                  
                if(results.length == 0){
                    res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.ACCESS_DENIED,'USER NOT FOUND..'));
                   return false;
                }

                var user = results[0];
                pwd      = hash.sha256_base64(pwd);

                if(user.PWD !== pwd) {
                    res.status(stCd.FORBIDDEN).send(errors.error(resMsg.ACCESS_DENIED,'UNAUTHORIZAED USER..'));
                    return  false;
                }
                logState.updateLoginState(user.MEMBER_SEQ,'Y',res).then((data)=>{
                    console.log("Data : ", data);
                    if(data == 0){
                        res.status(stCd.DB_ERROR).send(errors.error(resMsg.REQUEST_FAILD,'REQUEST_FAILD..'));
                        return  false;
                    }
                    return resolve(user);   
                });
            });
        })
    }        
}