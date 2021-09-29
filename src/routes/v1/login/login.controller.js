const auth          = require('../../../middlewares/authorization');
const logState      = require('../../../middlewares/loginState');
const hash          = require('../../../middlewares/hashFnc');
const resMsg        = require('../../../utils/responseMssage');
const stCd          = require('../../../utils/statusCode');
const loginService  = require('./service/login.service');
const errors        = require('../../../utils/error');
const bodyParser    = require('body-parser');
const express       = require('express');
const router        = express.Router();
const cookie        = require('cookie');
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

require('dotenv').config();

router.get("/",(req,res)=>{
    res.render('login/login.ejs');
});


router.post('/login_process',async (req,res)=>{
    var email   = req.body.email;
    var pwd     = req.body.pwd;
    console.log("login_process : init..");
    var cookies = {};
    if(req.headers.cookie !== undefined) cookies = cookie.parse(req.headers.cookie);
    var error;
    var results;
    loginService.login(email,pwd,res).then((user)=>{
        console.log("login_process : init..",user);
        var authCode = auth.getAuthorizationCode(user.MEMBER_SEQ);
        auth.insertAuthorizationCode(authCode,user.MEMBER_SEQ).then((result)=>{
            if(result === 'no'){
                error = errors.error(resMsg.INSERT_FAILD,'AUTHORIZATION_CODE','','INSERT Error','AUTHORIZATION INSERT FAILAD..');
                results = '?error=' + error;
            }
            results = '?code=' + authCode;
            
            logState.updateLoginState(user.MEMBER_SEQ,'Y',res).then((data)=>{
                console.log("Data : ", data);
                if(data == 0){
                    console.log("login 실패...");
                }
                res.redirect(hash.decrypt(cookies.re_lo) + results);
                res.end();
            });
        });
    });
});

router.get("/address",(req,res)=>{
    res.render("address/jusoPopup.ejs");
});


module.exports = router;