const express = require('express')
const handlebars = require('express-handlebars');
const routes = require('../routes');
const upload = require('multer')({dest:'/temp/'});

module.exports = (app) => {
app.engine('hbs', handlebars.engine({extname:'hbs'}));
app.set('view engine', 'hbs');
app.set('views', './src/views');


app.use(upload.array('upload',1));
app.use(express.urlencoded({extended: false}));
app.use('/static', express.static('public'));
app.use(routes);
}