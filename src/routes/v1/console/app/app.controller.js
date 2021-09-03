const express       = require('express');
const appVo         = require('./vo/app.vo').app;
const requestIp     = require('request-ip');
const appService    = require('./service/app.service');
const util          = require('../../../../utils/util');
const stCd          = require('../../../../utils/statusCode');
const errors        = require('../../../../utils/error');
const success       = require('../../../../utils/success');
const resMsg        = require('../../../../utils/responseMssage');
const router        = express.Router();

router.post("/",(req,res)=>{
    var client_id = util.getClientId(req.body.id);
    var secretKey = util.getSecretKey(req.body.id);
    var ip = requestIp.getClientIp(req);
    var app = appVo(req.body.id,req.body.appName,req.body.enterpriseName,req.body.filePath,req.body.originalFileName,req.body.renameFileName,ip,client_id,secretKey);

    appService.insertApp(app,res).then((data)=>{
        if(data > 0){
            res.status(stCd.CREATED).send(success.success_json(resMsg.SUCCESS_REQUEST,data,true));
            res.end();
        }
    });
    
});
router.get("/",(req,res)=>{
    var memberSeq = req.query.id;
    var limit = req.query.limit;
    var order = req.query.order;
    if(limit === undefined) limit = 100;
    if(order === undefined) order = 'DESC';
    appService.selectAppList(memberSeq,limit,order).then((data)=>{
        res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data));
        res.end();
    });
});



router.get("/:id",(req,res)=>{
    console.log("app list init...")
    var param = req.params.id;
    appService.appDetail(param).then((data)=>{
        res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data));
        res.end();
    });
    
});

router.delete("/:id",(req,res)=>{
    console.log("app delete init...")
    var param = req.params.id;
    appService.deleteApp(param,res).then((data)=>{
        res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data));
        res.end();
    });
    
});

module.exports = router;
