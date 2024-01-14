const express       = require('express');
const createError    = require('http-errors');
const path             = require('path');
const v1Routes              = require('./routes/v1/main');
const authRoutes            = require('./routes/v1/auth/auth.controller');
const shchedule       = require('./middlewares/movieScheduler');
const app                   = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); 
app.set("views",path.join(__dirname,'/views'));

app.use('/v1', v1Routes);
app.use('/oauth',authRoutes);




require('./www/server')(app);