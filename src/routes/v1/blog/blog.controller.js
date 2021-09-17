const requestIp     = require('request-ip');
const express       = require('express');
const router        = express.Router();
const blogService   = require('./service/blog.service');
const pagination    = require('../../../utils/pagination');
const blogVo        = require('./vo/blog.vo');
const stCd          = require('../../../utils/statusCode');
const resMsg        = require('../../../utils/responseMssage');
const success       = require('../../../utils/success');
const auth          = require("../../../middlewares/authorization");
const error         = require("../../../utils/error");
const token         = require('../../../middlewares/token');


router.post('/write',auth.tokenValidator,(req,res)=>{
    var title      = req.body.title;
    var content    = req.body.content;
    var memberSeq  = req.query.id;
    var mainImg    = req.body.mainImg;
    var category   = req.body.category;
    var ip         = requestIp.getClientIp(req);
    blogService.insert(blogVo.blog(memberSeq,mainImg,title,content,ip,memberSeq,category),res).then((data)=>{
        if(data > 0){
            res.status(stCd.CREATED).send(success.success_json(resMsg.CREATED,data,true));
            res.end();
        }
    });
});
router.get('/list',async(req,res)=>{
    console.log("list init....",req.query);
    var blog           = {cpage:req.query.cpage,selectSize:req.query.selectSize,title:req.query.title,content:req.query.content,limit:req.query.limit,memberSeq:req.query.id};
    var scope          = req.query.scope;

    if(scope.indexOf(",") > -1){
        var categoty       = scope.split(",");
        var reqToken       = req.headers.authorization;
        var tokenCategory  = reqToken.split(' ');
        reqToken           = tokenCategory[1];
        var result         = token.verify(reqToken);
        blog.memberSeq     = result.memberSeq;

        switch(categoty[0]){
            case 'list': await list(blog,res); break;
            case 'paging': await pagingList(blog,res); break;
        }

    }else{
        blog.memberSeq = '';
        switch(scope){
            case 'list': await list(blog,res); break;
            case 'paging': await pagingList(blog,res); break;
        }
    }
});


    router.get("/detail",(req,res)=>{
        console.log("detail init....")
        var blogSeq= req.query.blogSeq;
        blogService.selectOne(blogSeq,res).then((data)=>{
            res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data))
        });
    });

    router.delete("/detail",auth.tokenValidator,(req,res)=>{
        var blogSeq= req.query.blogSeq;
        blogService.deleteBlog(blogSeq,res).then((data)=>{
            res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data))
        });
    });

    router.put("/detail",auth.tokenValidator,(req,res)=>{
        var title      = req.body.title;
        var content    = req.body.content;
        var memberSeq  = req.query.id;
        var mainImg    = req.body.mainImg;
        var blogSeq    = req.body.blogSeq;
        var ip         = requestIp.getClientIp(req);
        blogService.update(blogVo.updateBlog(title,content,mainImg,ip,memberSeq,blogSeq),res).then((data)=>{
            if(data > 0){
                res.status(stCd.CREATED).send(success.success_json(resMsg.SUCCESS_REQUEST,data,true));
                res.end();
            }
        });
    });
    router.get("/top3",(req,res)=>{
        var memberSeq = req.query.id;
        var scope     = req.query.scope;
        console.log("scope : ", scope);
        if(scope === undefined) {
            res.send(error.error(resMsg.BAD_REQUEST,'not found scope..'));
            return false;
        }

        if(scope  == "list") memberSeq = "";

        blogService.selectBlogTop3(memberSeq,res).then((data)=>{
            res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data))
        });
    });



async function list(blog,res){
    console.log("list inti...")
    blogService.selectList(blog,res).then((data)=>{
        res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data,''));
        res.end();
    });
}

async function pagingList(blog,res){
    var paging         = {};
    var totalCount     = 0;
    var totalPageCount = 0;
    //내 블로그 작성글 전체 카운트
    blogService.totalCount(blog.memberSeq,res).then((data)=>{
        console.log("total count = ", data);
        totalCount         = data;
        totalPageCount     = pagination.getTotalPageCount(totalCount,blog.limit);
        blog.firstIndex    = pagination.firstIndex(blog.cpage,blog.limit);

        if(blog.selectSize === undefined)
        blog.lastIndex     = pagination.lastIndex(blog.cpage,blog.limit);
        else
        blog.lastIndex     = pagination.lastIndex(blog.cpage,blog.selectSize);
        
        blogService.selectList(blog,res).then((data)=>{
            paging.totalpage    = parseInt(totalPageCount);
            paging.totalCount   = parseInt(totalCount);
            res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data,'',paging));
            res.end();
        });
    });
}



module.exports = router;