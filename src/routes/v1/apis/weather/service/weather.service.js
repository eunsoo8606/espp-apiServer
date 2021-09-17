const mysqlConObj = require('../../../../../config/mysql');
const weatherQs   = require('../query/weather.query');
const error          = require('../../../../../utils/error');
const resMsg          = require('../../../../../utils/responseMssage');
module.exports = {
    getLocationGridXY: (address,res)=>{
        return new Promise((resolve, reject)=>{
            const db = mysqlConObj.init();
            console.log(weatherQs.getLocationGridXY)
            db.query(weatherQs.getLocationGridXY,address,function (err, results, fields) { // testQuery 실행
                if (err || !results) {
                    res.send(error.error(resMsg.DB_ERROR,err));
                    res.end();
                    return false;
                }
                resolve(results[0]);
            });
        });
    }
};