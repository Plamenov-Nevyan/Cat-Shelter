const router = require('express').Router()
const services = require('../services/catsServices')
router.get('/edit/:catId', (req, res) => {
    let cat = services.getOneCat(req.params.catId)
    let breeds = services.getAllBreeds()
    res.render('editCat', {cat, breeds})
})

router.get('/shelter/:catId', (req, res) => {
    let cat = services.getOneCat(req.params.catId)
    res.render('shelterCat', {cat})
})

module.exports = router