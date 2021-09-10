const express        = require('express');
const router         = express.Router();
const userRouter     = require('./users/users.controller');
const loginRouter    = require('./login/login.controller');
const consoleRouter  = require('./console/console.controller');
const auth           = require('../../middlewares/authorization');
const apisRouter     = require('./apis/apis.controller');
const blogRouter     = require('./blog/blog.controller');
const mailRouter     = require('./mail/mail.controller');

router.use("/console",auth.tokenValidator,consoleRouter);
router.use("/user",auth.tokenValidator,userRouter);
router.use("/login",loginRouter);
router.use("/apis",apisRouter);
router.use("/blog",auth.tokenValidator,blogRouter);
router.use("/mail",mailRouter);
module.exports = router;
