const crypto = require('crypto');
const Crypto = require('crypto-js');
module.exports ={
    md5_Base64:(value)=>{
        var encode = crypto.createHash('md5').update(value).digest('base64');
        encode = encode.replace('+','=');
        encode = encode.substr(0,55);
        return encode;
    }, //client_id
    md5_hex:(value)=>{return crypto.createHash('md5').update(value).digest('hex');}, //secretKey
    sha256_base64:(value)=>{return crypto.createHash('sha256').update(value).digest('base64');}, //password
    sha256_hex:(value)=>{return crypto.createHash('sha256').update(value).digest('hex');},
    sha512_base64:(value)=>{return crypto.createHash('sha512').update(value).digest('base64');},
    sha512_hex:(value)=>{return crypto.createHash('sha512').update(value).digest('hex');},//AuthorizationCode
    encrypt:(data)=>{return Crypto.AES.encrypt(data,process.env.secretKey).toString();},
    decrypt:(data)=>{return Crypto.AES.decrypt(data,process.env.secretKey).toString(Crypto.enc.Utf8);}
}

function md5_Base64(id){
    return crypto.createHash('md5').update(id).digest('base64');
}
function md5_hex(id){
    return crypto.createHash('md5').update(id).digest('hex');
}