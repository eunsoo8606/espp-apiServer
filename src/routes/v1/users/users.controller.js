const express      = require('express');
const userService  = require('./service/user.service');
const stCd         = require('../../../utils/statusCode');
const userVo       = require('./vo/user.vo').user;
const requestIp    = require('request-ip');
const router       = express.Router();
const hash         = require('../../../middlewares/hashFnc');

router.post('/logout',(req,res)=>{
    
});

router.get('/me',(req,res)=>{
    console.log("user : ", req.query.id)
    userService.userSelectOne(req.query.id).then((data)=>{
        if(data.success)
        res.status(stCd.OK).send(data);
        else
        res.status(stCd.BAD_REQUEST).send(data);
    });
});

router.post('/regist',(req,res)=>{
    console.log("회원가입 data 확인 nickname :  ", req.body.nickname,", email : ", req.body.email,", pwd : ",req.body.pwd,", post : "
    ,req.body.post,", addr1 : ",req.body.addr1,", addr2 : ",req.body.addr2);
    var nickname = req.body.nickname;
    var email = req.body.email;
    var pwd = hash.sha256_base64(req.body.pwd);
    var post = req.body.post;
    var addr1 = req.body.addr1;
    var addr2 = req.body.addr2;
    var regpIp = requestIp.getClientIp(req);
    var regDttm = new Date();
    userService.insertUser(userVo(email,pwd,nickname,'100',post,addr1,addr2,regpIp,regDttm),res).then((data)=>{
        if(data > 0){
           res.redirect("/v1/login");
        }else{
            res.render("/error/error.ejs",{"status":"401","message":"회원등록에 실패 했습니다."});
        }
    });
});



module.exports = router;




