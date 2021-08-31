const express = require('express');
const router = express.Router();
const userService = require('./service/user.service');
const stCd = require('../../../utils/statusCode');
// var authRouter = require('../auth/auth.controller');


// router.use("/auth",authRouter);
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



module.exports = router;




