const express = require('express')
const handlebars = require('express-handlebars')
const routes = require('./routes')
const upload = require('multer')()

const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', handlebars.engine({extname:'hbs'}))
app.set('view engine', 'hbs')
app.set('views', './src/views')

app.use(upload.array())
app.use(express.urlencoded({extended: false}))
app.use('/static', express.static('public'))
app.use(routes)



app.listen(port, console.log(`Server listening on port ${port}...`))
