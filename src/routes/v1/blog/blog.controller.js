const requestIp     = require('request-ip');
const express       = require('express');
const router        = express.Router();
const blogService   = require('./service/blog.service');
const blog          = require('./vo/blog.vo').blog;
const stCd          = require('../../../utils/statusCode');
const resMsg        = require('../../../utils/responseMssage');
const success       = require('../../../utils/success');


router.post('/write',(req,res)=>{
    var title      = req.body.title;
    var content    = req.body.content;
    var memberSeq  = req.body.memberSeq;
    var mainImg    = req.body.mainImg;
    var ip = requestIp.getClientIp(req);
    blogService.insert(blog(memberSeq,mainImg,title,content,ip,memberSeq),res).then((data)=>{
        if(data > 0){
            res.status(stCd.CREATED).send(success.success_json(resMsg.CREATED,data,true));
            res.end();
        }
    });
});
router.get('/list',(req,res)=>{
    var cpage = req.query.cpage;
    var selectSize = req.query.selectSize;
    var searchKeyWord = req.query.searchKeyWord;
    var limit = req.query.limit;
    

});






module.exports = router;