const success = {};
require('dotenv').config();
module.exports = {
    successAuth:(authorizationCode,redirect_uri) =>{   
            success.authorizationCode = authorizationCode;
            success.redirect_uri = redirect_uri;
            
        return success;
    },
    success_json:(msg,data,result)=>{
        success.success = result;
        success.providor = process.env.providor;
        success.message = msg;
        success.data = data;

        return success;
    }
}