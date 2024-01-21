const express        = require('express');
const router         = express.Router();
const weatherService = require('./service/weather.service');

router.get('/locationGrid',(req,res)=>{
    let address = req.query.address;
    weatherService.getLocationGridXY(address,res).then((data)=>{
        res.status(200).json({'lat':data.HANGDONG_DONG_LAT,'lng':data.HANGDONG_DONG_LNG});
    });
});




module.exports= router;
