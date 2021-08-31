const util = require('../../../../../utils/util');
module.exports={
    app:(memberSeq,appName,enterpriseName,filePath,originalFileName,renameFileName,ip,client_id,secretKey) =>{
        return [memberSeq,appName,enterpriseName,filePath,originalFileName,renameFileName,memberSeq,ip,util.dateFormat(new Date()),client_id,secretKey];
    }
}