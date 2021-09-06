const express       = require('express');
const router        = express.Router();
const movieService  = require('./service/movie.service');


router.get("/",(req,res)=>{
    movieService.selectList(res).then((data)=>{
        res.status(200).send(data);
        res.end();
    });
});



module.exports = router;