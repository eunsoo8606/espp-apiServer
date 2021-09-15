const express        = require('express');
const router         = express.Router();
const movieRouter    = require('./movie/movie.controller');
const weatherRouter  = require('./weather/weather.controller');

router.use('/movie',movieRouter);
router.use('/weather',weatherRouter);



module.exports= router;

