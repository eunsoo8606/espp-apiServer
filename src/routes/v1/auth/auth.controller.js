const renewalToken  = require('../../../middlewares/renewalToken').getRefreshToken;
const ctIdVaildator = require('../../../middlewares/authorization');
const auth          = require('../../../middlewares/authorization');
const verify        = require('../../../middlewares/token');
const stCd          = require('../../../utils/statusCode');
const hash          = require('../../../middlewares/hashFnc');
const resMsg        = require('../../../utils/responseMssage');
const errors        = require('../../../utils/error');
const logState      = require('../../../middlewares/loginState');
const express       = require('express');
const router        = express.Router();


router.get('/authorize',ctIdVaildator.clientIdCheck,(req,res)=>{
    var redirect_uri = undefined;
    if(req.query.redirect_uri !== undefined) redirect_uri = hash.encrypt(req.query.redirect_uri);
    if(redirect_uri === undefined) res.status(stCd.BAD_REQUEST).send(errors.error(resMsg.BAD_REQUEST,'redirect_uri','undefined','APPLICATION ERROR','redirect uri null...'));
    res.writeHead(stCd.REDIRECT,{
        location:'/v1/login',
        "Set-Cookie":[
                      `continue=${req.query.client_id}; Path=/`,
                      `re_lo=${redirect_uri}; Path=/`
                     ],
        HttpOnly:true
    });
    res.end();
});

router.post('/token',auth.checkAuthorizationCode,async (req,res)=>{
    console.log("token init....")
    var memberSeq  = req.query.memberSeq;
    var grant_type = req.body.grant_type;

    if(grant_type === 'refresh_token'){
        renewalToken(verify.verify(req.body.refreshToken),res).then((renewal_token_json)=>{
            res.status(stCd.OK).send(renewal_token_json);
            res.end();
        });
        return false;
    }

    auth.getToken(memberSeq).then((token)=>{
        if(token.error !== undefined){
            res.status(stCd.BAD_REQUEST).send(token);
            return false;
        }
        res.status(stCd.OK).send(token);
    });
});


router.get("token/status",(req,res)=>{
    var tokenState = auth.checkToken(req.headers.authorization);
    res.send(tokenState);
});

router.get("/logout",ctIdVaildator.tokenValidator,(req,res)=>{
    console.log("logout init.......")
    var memberSeq    = req.query.id;
    var redirect_uri = req.query.redirect_uri;
    logState.updateLoginState(memberSeq,'N',res).then((data)=>{
        if(data > 0){
            console.log("redirect_uri : ", redirect_uri + '?resultCode=1')
            res.redirect(redirect_uri + '?resultCode=1');
            res.end();
            return false;
        }
        res.redirect(redirect_uri + '?resultCode=401&error_msg=logut_faild');
        res.end();
    });
});


module.exports = router;

