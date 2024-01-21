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
const comment       = require("./vo/comment.vo");
const common        = require("../common/common.vo");

router.post('/write',auth.tokenValidator,(req,res)=>{
    let title      = req.body.title;
    let content    = req.body.content;
    let memberSeq  = req.query.id;
    let mainImg    = req.body.mainImg;
    let category= req.body.category;
    let ip         = requestIp.getClientIp(req);

    blogService.insert(blogVo.blog(memberSeq,mainImg,title,content,ip,memberSeq,category),res).then((data)=>{
        console.log("Data : ", data);
        if(data > 0){
            res.status(stCd.CREATED).send(success.success_json(resMsg.CREATED,data,true));
            res.end();
        }
    });
});
router.get('/list',async(req,res)=>{
    console.log("list init....",req.query);
    let blog= {cpage:req.query.cpage,selectSize:req.query.selectSize,title:req.query.title,content:req.query.content,limit:req.query.limit,memberSeq:req.query.id};
    let scope          = req.query.scope;

    if(scope !== undefined && scope.indexOf(",") > -1){
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

    router.post('/count',(req,res)=>{
        var blogSeq = req.body.blogSeq;
        blogService.count(blogSeq).then((data)=>{
            if(data > 0){
                res.status(stCd.CREATED).send(success.success_json(resMsg.SUCCESS_REQUEST,data,true));
                res.end();
            }
        });
    });

    router.get("/detail/comments",(req,res)=>{
   
        var blogSeq= req.query.blogSeq;
        blogService.selectComments(blogSeq,res).then((data)=>{
            res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data))
        });
    });
    router.post("/detail/comments",(req,res)=>{
        
        var blogSeq     = req.body.blogSeq;
        var authSeq     = req.body.authSeq;
        var text        = req.body.text;
        var parentSeq   = req.body.parentSeq;
        var commetLevel = req.body.commentLevel == undefined? 1 : req.body.commentLevel;

        blogService.insertComment(common.commonVO([blogSeq,authSeq,parentSeq,text,commetLevel]),parentSeq,res).then((data)=>{
            if(data > 0){
                res.status(stCd.CREATED).send(success.success_json(resMsg.SUCCESS_REQUEST,data,true));
                res.end();
            }
        });
    });
    router.delete("/detail/comments",auth.tokenValidator,(req,res)=>{
        var blogSeq     = req.query.blogSeq;
        var commentSeq  = req.query.commentSeq;
        console.log("comment Seq : ", commentSeq);
        blogService.deleteComment(commentSeq,res).then((data)=>{
            res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data))
        });
    });

    router.put("/detail/comments",auth.tokenValidator,(req,res)=>{
        var blogSeq     = req.body.blogSeq;
        var commentSeq  = req.body.commentSeq;
        var text        = req.body.text;
        console.log("comment Seq : ", commentSeq);
        blogService.updateComment(comment.update(blogSeq,commentSeq,text),res).then((data)=>{
            res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data))
        });
    });




async function list(blog,res){
    console.log("list inti...")
    blogService.selectList(blog,res).then((data)=>{
        console.log("data : ", data)
        res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data,''));
        res.end();
    });
}

async function pagingList(blog,res){
    var paging         = {};
    var totalCount     = 0;
    var totalPageCount = 0;
    //내 블로그 작성글 전체 카운트
    blogService.totalCount(blog,res).then((data)=>{
        totalCount         = data;
        var limit          = 10;

        if(blog.selectSize !== undefined)
        limit = blog.selectSize

        blog.lastIndex     = pagination.lastIndex(blog.cpage,limit);
        totalPageCount     = pagination.getTotalPageCount(totalCount,limit);
        blog.firstIndex    = pagination.firstIndex(blog.cpage,limit);

        blogService.selectList(blog,res).then((data)=>{
            paging.totalpage    = parseInt(totalPageCount);
            paging.totalCount   = parseInt(totalCount);
            res.status(stCd.OK).send(success.success_json(resMsg.SUCCESS_REQUEST,data,'',paging));
            res.end();
        });
    });
}



module.exports = router;