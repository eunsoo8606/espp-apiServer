const express       = require('express');
const router        = express.Router();
const mailService   = require('./service/mail.service');


/*
 @Description : 유저 이메일 중복확인 router
 @Parameter : email
 @RequestData : email
 @ResponseData : string
*/
router.get('/userEmailCheck',(req,res)=>{
    console.log("req.params.email : " + req.query.email);
    mailService.vaildationMail(req.query.email,res).then((data)=>{
        res.send({'data':data});
        res.end();
    });
});


module.exports=router;