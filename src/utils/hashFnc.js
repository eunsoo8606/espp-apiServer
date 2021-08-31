const crypto = require('crypto');


module.exports ={
    md5_Base64:(pwd)=>{return crypto.createHash('md5').update(pwd).digest('base64');},                  //클라이언트 아이디
    md5_hex:(pwd)=>{return crypto.createHash('md5').update(pwd).digest('hex');},                        //시크릿 키
    sha256_base64:(pwd)=>{return crypto.createHash('sha256').update(pwd).digest('base64');},            //패스워드
    sha256_hex:(pwd)=>{return crypto.createHash('sha256').update(pwd).digest('hex');},
    sha512_base64:(pwd)=>{return crypto.createHash('sha512').update(pwd).digest('base64');},            //AuthorizationCode
    sha512_hex:(pwd)=>{return crypto.createHash('sha512').update(pwd).digest('hex');},
    encrypt:(data)=>{return Crypto.AES.encrypt(data,process.env.secretKey).toString();},
    decrypt:(data)=>{return Crypto.AES.decrypt(data,process.env.secretKey).toString(Crypto.enc.Utf8);}
}