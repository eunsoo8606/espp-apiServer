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
    error:(error,error_description)=>{
        error.error = error;
        error.error_description = error_description;
        error.result = false;
        return error;
    }
}