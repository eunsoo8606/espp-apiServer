const requestIp     = require('request-ip');
const express       = require('express');
const router        = express.Router();
const blogService   = require('./service/blog.service');
const pagination    = require('../../../utils/pagination');
const blogVo          = require('./vo/blog.vo');
const stCd          = require('../../../utils/statusCode');
const resMsg        = require('../../../utils/responseMssage');
const success       = require('../../../utils/success');


router.post('/write',(req,res)=>{
    var title      = req.body.title;
    var content    = req.body.content;
    var memberSeq  = req.query.id;
    var mainImg    = req.body.mainImg;
    var ip         = requestIp.getClientIp(req);
    blogService.insert(blogVo.blog(memberSeq,mainImg,title,content,ip,memberSeq),res).then((data)=>{
        if(data > 0){
            res.status(stCd.CREATED).send(success.success_json(resMsg.CREATED,data,true));
            res.end();
        }
    });
});
router.get('/list',(req,res)=>{
    console.log("list init....")
    var blog           = {cpage:req.query.cpage,selectSize:req.query.selectSize,title:req.query.title,content:req.query.content,limit:req.query.limit,memberSeq:req.query.id};
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
        
        console.log("blog 값 : ", blog);
        blogService.selectList(blog,res).then((data)=>{

            paging.totalpage    = parseInt(totalPageCount);
            paging.totalCount   = parseInt(totalCount);
            res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data,'',paging));
            res.end();

        });
    });


    router.get("/detail",(req,res)=>{
        console.log("detail init....")
        var blogSeq= req.query.blogSeq;
        blogService.selectOne(blogSeq,res).then((data)=>{
            res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data))
        });
    });

    router.delete("/detail",(req,res)=>{
        var blogSeq= req.query.blogSeq;
        blogService.deleteBlog(blogSeq,res).then((data)=>{
            res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data))
        });
    });

    router.put("/detail",(req,res)=>{
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
        console.log("top3 init..")
        blogService.selectBlogTop3(memberSeq,res).then((data)=>{
            res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data))
        });
    });

});






module.exports = router;