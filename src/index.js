const express = require('express');
const databaseInit = require('./config/db')

const app = express();
const port = process.env.PORT || 3000;

require('./config/express')(app)


databaseInit()
.then(() => {console.log('Database connected...'); app.listen(port, console.log(`Server listening on port ${port}...`))})
.catch(err => {throw new Error(err)});

;
