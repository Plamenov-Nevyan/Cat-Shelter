const req = require('express/lib/request')
const handlebars = require('express-handlebars')
const express = require('express')
let cats = require('./database/cats.json')
let breeds = require('./database/breeds.json')

const app = express()
const port = process.env.PORT || 3000


app.engine('hbs', handlebars.engine({extname:'hbs'}))
app.set('view engine', 'hbs')
app.set('views', './src/views')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home', {cats})
})

app.listen(port, console.log(`Server listening on port ${port}...`))
