const mysql         = require('../../../../config/mysql');
const mailQs        = require('../query/mail.query');

module.exports={
    vaildationMail:(mail,res)=>{
        return new Promise((resolve,reject)=>{
            const db = mysql.init();
            db.query(mailQs.COUNT,mail,function (err, results, fields) {
                // 회원정보 조회 결과
                if (err !== undefined && err !== null) {
                  res.send(errors.error(resMsg.DB_ERROR,'DB Error',err));
                  return false;
                }

                console.log("mail Count : ", results[0].count);
                return resolve(results[0].count);
            });
        });
    }
}