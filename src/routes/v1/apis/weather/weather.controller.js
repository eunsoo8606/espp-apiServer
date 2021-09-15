const express        = require('express');
const router         = express.Router();
const weatherService = require('./service/weather.service');


router.get('/locationGrid',(req,res)=>{
    var address = req.query.address;
    console.log("init...",address)
    weatherService.getLocationGridXY(address,res).then((data)=>{
        res.status(200).json({'lat':data.HANGDONG_LAT,'lng':data.HANGDONG_LNG});
    });
});




module.exports= router;
