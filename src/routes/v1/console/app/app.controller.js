const express       = require('express');
const appVo         = require('./vo/app.vo');
const requestIp     = require('request-ip');
const appService    = require('./service/app.service');
const util          = require('../../../../utils/util');
const stCd          = require('../../../../utils/statusCode');
const errors        = require('../../../../utils/error');
const success       = require('../../../../utils/success');
const resMsg        = require('../../../../utils/responseMssage');
const auth          = require('../../../../middlewares/authorization');
const router        = express.Router();

router.post("/",(req,res)=>{
    var client_id = util.getClientId(req.body.id);
    var secretKey = util.getSecretKey(req.body.id);
    var ip = requestIp.getClientIp(req);
    var app = appVo.app(req.body.id,req.body.appName,req.body.enterpriseName,req.body.filePath,req.body.originalFileName,req.body.renameFileName,ip,client_id,secretKey);

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



router.delete("/:id",(req,res)=>{
    console.log("app delete init...")
    var param = req.params.id;
    appService.deleteApp(param,res).then((data)=>{
        res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data));
        res.end();
    });
    
});

router.get("/info",auth.tokenValidator,(req,res)=>{
    var appSeq = req.query.appSeq;
    console.log("appSeq : ", appSeq )
    appService.appDetail(appSeq,res).then((data)=>{
        if(data === undefined){
            res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.BAD_REQUEST,'data not found'));
            return false;
        }
        res.send(success.success_json(resMsg.SUCCESS_REQUEST,data));
        res.end();
    });
    
});

router.put("/",(req,res)=>{

    var ip = requestIp.getClientIp(req);
    var app;
    if(req.body.filePath !== undefined)
    app = appVo.app3(req.body.appName,req.body.enterpriseName,req.body.filePath,req.body.originalFileName,req.body.renameFileName,ip,req.query.id);
    else
    app = appVo.app2(req.body.appName,req.body.enterpriseName,ip,req.query.id);

    appService.updateApp(app,req.body.filePath,res).then((data)=>{
        if(data > 0){
            res.status(stCd.CREATED).send(success.success_json(resMsg.SUCCESS_REQUEST,data,true));
            res.end();
        }
    });
    
});

module.exports = router;
