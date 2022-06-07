const express = require('express');
const handlebars = require('express-handlebars');
const routes = require('./routes');
const upload = require('multer')({dest:'/temp/'});
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const dbUrl = `mongodb://localhost:27017/catShelter`;
mongoose.connect(dbUrl)
.then(() => console.log('Database connected...'))
.catch(err => {throw new Error(err)});

app.engine('hbs', handlebars.engine({extname:'hbs'}));
app.set('view engine', 'hbs');
app.set('views', './src/views');


app.use(upload.array('upload',1));
app.use(express.urlencoded({extended: false}));
app.use('/static', express.static('public'));
app.use(routes);

app.listen(port, console.log(`Server listening on port ${port}...`));
