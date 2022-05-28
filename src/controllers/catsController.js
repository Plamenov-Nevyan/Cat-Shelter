const router = require('express').Router();
const services = require('../services/catsServices');

router.get('/edit/:catId', (req, res) => {
    let cat = services.getOneCat(req.params.catId);
    let breeds = services.getAllBreeds();
    res.render('editCat', {cat, breeds});
});
router.post('/edit/:catId', (req, res) => {
 if(Object.values(req.body).includes(``)){res.status(400).send('Invalid request!');}
 else{
     services.updateCat(req.body)
     .then(response => res.redirect(`/edit/${req.params.catId}`))
     .catch(err => {throw new Error(`${err.message}`)})
 };
});

router.get('/shelter/:catId', (req, res) => {
    let cat = services.getOneCat(req.params.catId);
    res.render('shelterCat', {cat});
});

module.exports = router;