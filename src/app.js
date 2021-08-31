const express       = require('express');
const createError   = require('http-errors');
const path          = require('path');
const v1Routes      = require('./routes/v1/main');
const authRoutes    = require('./routes/v1/auth/auth.controller');
const ctIdVaildator = require('./middlewares/authorization').clientIdCheck;
const shchedule     = require('./middlewares/movieScheduler');
const app           = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); 
app.set("views",path.join(__dirname,'/views'));

app.use('/v1', v1Routes);
app.use('/oauth',ctIdVaildator,authRoutes);

// error handler
app.use((err, req, res, next) => {
    let apiError = err
  
    if (!err.status) apiError = createError(err)
 
    // set locals, only providing error in development
    res.locals.message = apiError.message
    res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {}
  
    // render the error page
    return res.status(apiError.status).json({message: apiError.message})
  });


module.exports = app;
