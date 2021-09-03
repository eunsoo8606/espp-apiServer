const errors = require('../../../../utils/error');
const resMsg = require('../../../../utils/responseMssage');
const blogQs = require('../query/blog.query');
const mysqlConObj = require('../../../../config/mysql');



module.exports = {
    insert : (data,res) =>{
        return new Promise((resolve, reject)=>{
                var db = mysqlConObj.init();
                db.beginTransaction();
                db.query(blogQs.INSERT,data,function(err,results,fields){
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
    }
}