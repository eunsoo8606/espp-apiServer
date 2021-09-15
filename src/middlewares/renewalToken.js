const token         = require('./token');
const userService   = require('../routes/v1/users/service/user.service');
const stCd          = require('../utils/statusCode');
const resMsg        = require('../utils/responseMssage');
const errors        = require('../utils/error');

module.exports = {
    //토큰 결과 정상이면 토큰 반환
    //비정상이면 에러 response
    getRefreshToken:(data,res)=>{
        if(data === 'TOKEN_INVALID'){
            res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.INVALID_TOKEN,data));
            return false;
        }
        if(data === 'TOKEN_EXPIRED'){
            res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.EXPIRED_TOKEN,data));
            return false;
        }
        return new Promise((resolve,reject)=>{
            userService.userSelectOne(data.memberSeq).then((user)=>{
                token.sign(user.data).then((tok)=>{
                    return resolve(token.json_token(user,tok ,'','N'));
                })
            });
        })
    }
}