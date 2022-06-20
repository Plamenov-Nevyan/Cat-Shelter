const express = require('express')
const handlebars = require('express-handlebars');
const routes = require('../routes');
const upload = require('multer')({dest:'/temp/'});
const userData = require('../middlewares/userMiddleware')
const cookieParser = require('cookie-parser')

module.exports = (app) => {
app.engine('hbs', handlebars.engine({extname:'hbs'}));
app.set('view engine', 'hbs');
app.set('views', './src/views');


app.use(upload.array('upload',1));
app.use(express.urlencoded({extended: false}));
app.use('/static', express.static('public'));
app.use(cookieParser())
app.use(userData)
app.use(routes);
}