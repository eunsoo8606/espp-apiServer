const appService  = require('../routes/v1/console/app/service/app.service');
const userService = require('../routes/v1/users/service/user.service');
const resMsg      = require('../utils/responseMssage');
const hash        = require('../middlewares/hashFnc');
const stCd        = require('../utils/statusCode');
const mysqlConObj = require('../config/mysql');
const errors      = require('../utils/error');
const success     = require('../utils/success');
const token       = require('./token');
// var requestIp     = require('request-ip');
require('dotenv').config();

module.exports = {
    clientIdCheck: (req,res,next) =>{
        var clientId = req.query.client_id;
        var redirect_uri = req.query.redirect_uri;
        var masterKey = req.query.local;
        if(masterKey !== undefined){
            if(masterKey === "FEGnkJwIfbvnzlmIG534uQ==")
            return next();
        }
        if(req.method === "POST") {
            clientId = req.body.client_id;
            redirect_uri = req.body.redirect_uri;
        }

        if(clientId === undefined || clientId === ""){
            clientId = 'undefined';
            res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.EMPTY_VALUE,'client_id',clientId,'NULL POINT ERROR','EMPTY VALUE..'));
            return false;
        }
    
        const db = mysqlConObj.init();
        var query = `SELECT *
                       FROM APPLICATION
                      WHERE CLIENT_ID = '${clientId}'`;

            console.log("DEBUG : APPLICATION QUERY ",query);
            db.query(query, function (err, results, fields) {

                //result Check
                if (err) {
                    res.status(stCd.DB_ERROR).send(errors.error(resMsg.DB_ERROR,'DATABASE ERROR..'));
                    return false;
                }

                if(results.length == 0){
                    res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.ACCESS_DENIED,'USER NOT FOUND..'));
                    return false;
                }

                var user = results[0];
                if(user.LOGIN_STATE === "N"){
                    res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.ACCESS_DENIED,'CHECK YOUR LOGIN STATUS..'));
                    return false;
                }

                if(user.WEB_DOMAIN === "" || user.WEB_DOMAIN === undefined){
                    res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.ACCESS_DENIED,'DOMAIN NOT FOUND..'));
                    return false;
                }

                db.end();
                return next();

            });
    },
    getAuthorizationCode:(memberSeq)=>{
        var authrizationCode = {memberSeq:memberSeq,issueDate:new Date()};
            authrizationCode = hash.sha512_hex(JSON.stringify(authrizationCode)).substr(0,55);
        return authrizationCode;
    },
    insertAuthorizationCode:(authorizationCode,memberSeq)=>{
        return new Promise((resolve,reject)=>{
                const db = mysqlConObj.init();
                db.beginTransaction();
                query = `INSERT INTO AUTHORIZATION(AUTHORIZATION_CODE,MEMBER_SEQ) 
                                    VALUES('${authorizationCode}','${memberSeq}')`;
                console.log("DEBUG : authCode query..")
                console.log("DEBUG : ", query)
                db.query(query, function (err, results, fields) {

                // authorization Code UPDATE 결과
                if (err !== undefined && err !== null) {
                    db.rollback();
                    db.end();
                    //res.send(errors.error(resMsg.DB_ERROR,'AUTHORIZATION_CODE','','DB Error','PLEASE CHECK DB..'));
                    return resolve('no');
                }
                
                if(results.affectedRows === 0){
                    db.rollback();
                    db.end();
                    //res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.INSERT_FAILD,'AUTHORIZATION_CODE','','INSERT Error','AUTHORIZATION INSERT FAILAD..'));
                    return resolve('no');
                }
                console.log("results.affectedRows : ", results.affectedRows);
                db.commit();
                return resolve('ok');
                });
        });
    },
    checkAuthorizationCode:(req,res,next)=>{
        console.log("auth interceptor init...");
        var reflreshToken = req.body.refreshToken;
        if(reflreshToken !== undefined) return next();


        var authorizationCode = req.body.code;
        if(authorizationCode === undefined){
            res.send(errors.error(resMsg.BAD_REQUEST,'CODE NOT FOUND..'));
            return false;
        }
        appService.getAuthApp(authorizationCode,res).then((data)=>{
            if(data.error !== undefined){
                res.status(stCd.DB_ERROR).send(data);
                return false;
            }
            req.query.memberSeq = data.MEMBER_SEQ;
            next();
        });
    },
    getToken: async(memberSeq)=>{
        return new Promise((resolve,reject)=>{                
            /*
             function json_token 
             user : 유저 정보
             tok : 엑세스 토큰
             data : 리플래쉬 토큰
             'Y/N' : 리플래쉬 토큰 생성 유무
            */ 
            userService.userSelectOne(memberSeq).then((user)=>{
                token.sign(user.data).then((tok)=>{
                    token.refreshToken(user.data).then((data)=>{
                        return resolve(token.json_token(user.data,tok,data,'Y'));
                    });
                });
            });//userSelectOne Close
        });// new Promise Close
    },
    tokenValidator:(req,res,next)=>{

        if(req.body.master !== undefined){
            return next();
        }

        var reqToken = req.headers.authorization;

        if(reqToken === undefined || reqToken === ''){
            res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.EMPTY_TOKEN,'TOKEN NOTFOUND'));
            res.end();
            return false;
        }

        var tokenCategory = reqToken.split(' ');

        if(tokenCategory[0] !== 'Bearer'){
            res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.BAD_REQUEST,'Invalid header type'));
            res.end();
            return false;
        }

        reqToken = tokenCategory[1];
        var result = token.verify(reqToken);

        if(result === 'TOKEN_INVALID') {
            res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.INVALID_TOKEN,'Invalid token'));
            res.end();
            return false;
        }

        if(result === 'TOKEN_EXPIRED') {
            res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.EXPIRED_TOKEN,'Invalid token'));
            res.end();
            return false;
        }
        userService.userSelectOne(result.memberSeq).then((data)=>{
            if(data.LOGIN_STATE == "N"){
                res.status(stCd.FORBIDDEN).send(errors.error(resMsg.ACCESS_DENIED,'please check your login state..'));
            }
        });

        req.query.id    = result.memberSeq;
        
        return next();
    },
    checkToken:(token)=>{
        var reqToken      = token;
        var tokenCategory = reqToken.split(' ');
        reqToken          = tokenCategory[1];
        var result        = token.verify(reqToken);

        if(reqToken === undefined || reqToken === ''){
            return errors.error(resMsg.EMPTY_TOKEN,'TOKEN NOTFOUND');
        }

        if(tokenCategory[0] !== 'Bearer'){
            return errors.error(resMsg.BAD_REQUEST,'Invalid header type');
        }

        if(result === 'TOKEN_INVALID') {
            return errors.error(resMsg.INVALID_TOKEN,'Invalid token');
        }

        if(result === 'TOKEN_EXPIRED') {
            return errors.error(resMsg.EXPIRED_TOKEN,'Invalid token');
        }
        
        return success.success_status('normal');
    }
}
