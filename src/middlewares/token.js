const jwt          = require('jsonwebtoken');
const mysqlConObj  = require('../config/mysql');
const errors       = require('../utils/error');
const resMsg       = require('../utils/responseMssage');

require('dotenv').config();
//엑세스 토큰 옵션
const acOption = {
    algorithm: process.env.AC_algorithm, //해싱 알고리즘
    expiresIn: process.env.AC_expiresIn, //토큰 유효시간
    issuer:    process.env.AC_issuer     //토큰 발행자
}
//리프레쉬 토큰 옵션
const reOption = {
    algorithm: process.env.RE_algorithm, //해싱 알고리즘
    expiresIn: process.env.RE_expiresIn, //토큰 유효시간
    issuer:    process.env.RE_issuer     //토큰 발행자
}

module.exports = {
        sign: async(user) => {
            console.log(" : ", acOption)
            /* 현재는 idx와 email을 payload로 넣었지만 필요한 값을 넣으면 됨! */
            const payload = {
                memberSeq: user.MEMBER_SEQ,
                email: user.EMAIL
            };
            //jwt.sign('token내용', 'JWT secretkey')
            const token = jwt.sign(payload, process.env.secretKey,acOption);
            return token;
        },
        verify: (token) =>{
            let decoded;
            try {
                // verify를 통해 값 decode!
                decoded = jwt.verify(token, process.env.secretKey);
            } catch (err) {
                if (err.message === 'jwt expired') return 'TOKEN_EXPIRED';
                if (err.message === 'invalid token') return 'TOKEN_INVALID';
                else return 'TOKEN_INVALID';    
            }
            return decoded;
        },
        refreshToken: async (user)=>{
            return new Promise((resolve, reject)=>{
                
                 /* 현재는 idx와 email을 payload로 넣었지만 필요한 값을 넣으면 됨! */
                const payload = {memberSeq: user.MEMBER_SEQ, email: user.EMAIL};

                // jwt.sign('token내용', 'JWT secretkey')
                const token = jwt.sign(payload, process.env.secretKey,reOption);

                return resolve(token);
            });
        },
        json_token:(user,accessToken,refreshToken,refreshYn)=>{
            var success = {};
            success.providor = process.env.providor;
            success.nickname = user.NICK_NAME;
            success._json = {id:user.MEMBER_SEQ,connect_dt:new Date(),nickname:user.NICK_NAME};
            success.accessToken = accessToken;
            success.expires_in = process.env.AC_second;
            //리프레쉬 토큰 생성 유무
            if(refreshYn === 'Y'){
            success.refreshToken = refreshToken;
            success.refresh_token_expires_in = process.env.RE_second;
            }
            return success;
        }
}