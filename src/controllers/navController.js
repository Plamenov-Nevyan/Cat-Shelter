const router = require('express').Router()
const services = require('../services/catsServices')
router.get('/', (req, res) => {
    let cats = services.getAllCats()
    res.render('home', {cats})
})
router.get('/add/cat',(req, res) => {
    let breeds = services.getAllBreeds()
    res.render('addCat', {breeds})
})

router.get('/add/breed', (req, res) => {
   res.render('addBreed')
})

module.exports = router