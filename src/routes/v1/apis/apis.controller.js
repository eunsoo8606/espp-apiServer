const express        = require('express');
const router         = express.Router();
const movieRouter    = require('./movie/movie.controller');


router.use('/movie',movieRouter);




module.exports= router;

