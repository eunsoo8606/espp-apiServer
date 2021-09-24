const util = require('../../../../../utils/util');
module.exports={
    app:(memberSeq,appName,enterpriseName,filePath,originalFileName,renameFileName,ip,client_id,secretKey) =>{
        return [memberSeq,appName,enterpriseName,filePath,originalFileName,renameFileName,memberSeq,ip,util.dateFormat(new Date()),client_id,secretKey];
    },
    app2:(appName,enterpriseName,ip,memberSeq)=>{
        return [appName,enterpriseName,ip,memberSeq,new Date()];
    },
    app3:(appName,enterpriseName,filePath,originalFileName,renameFileName,ip,memberSeq)=>{
        return [appName,enterpriseName,filePath,originalFileName,renameFileName,ip,memberSeq,new Date()];
    }
}