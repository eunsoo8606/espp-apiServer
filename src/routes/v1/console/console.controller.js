const express = require('express');
const router = express.Router();
const appRouter = require('./app/app.controller');

router.use('/app',appRouter);
router.get("/",(req,res)=>{
    //res.render('/app/main.ejs');
});

module.exports = router;