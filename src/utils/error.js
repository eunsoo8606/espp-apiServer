const stCd      = require('./statusCode');
const resMsg    = require('./responseMssage');
var error       = {};
module.exports ={
    ERROR:{
        login_required:'user authentication required.',
        access_denied:'User denied access',
        consent_required:'user authentication required.',
        interaction_required:'need to collect additional personal information.'
    },
    error:(msg,param,value,err,resMsg,code)=>{
        error.msg = resMsg;
        error.detail = 
                    {
                        param:param,
                        value:value,
                        error:err,
                        msg:msg,
                        code:code
                    };
        error.result = false;
        return error;
    }
}