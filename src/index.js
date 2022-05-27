const express = require('express')
const handlebars = require('express-handlebars')
const services = require('./services/catsServices')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', handlebars.engine({extname:'hbs'}))
app.set('view engine', 'hbs')
app.set('views', './src/views')

app.use('/static', express.static('public'))
app.use(routes)

// app.get('/', (req, res) => {
//     let cats = services.getAllCats()
//     res.render('home', {cats})
// })
// app.get('/add/cat',(req, res) => {
//     let breeds = services.getAllBreeds()
//     res.render('addCat', {breeds})
// })

// app.get('/add/breed', (req, res) => {
//    res.render('addBreed')
// })

// app.get('/cats/edit/:catId', (req, res) => {
//     let cat = services.getOneCat(req.params.catId)
//     let breeds = services.getAllBreeds()
//     res.render('editCat', {cat, breeds})
// })

app.listen(port, console.log(`Server listening on port ${port}...`))
