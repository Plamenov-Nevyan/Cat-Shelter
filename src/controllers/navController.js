const router = require('express').Router();
const services = require('../services/catsServices');

router.get('/', (req, res) => {
    let cats = services.getAllCats(req.query);
    res.render('home', {cats});
});


router.get('/add/cat',(req, res) => {
    let breeds = services.getAllBreeds();
    res.render('addCat', {breeds});
});
router.post('/add/cat', (req, res) => {
   if(Object.values(req.body).includes(``)){return res.status(400).send('Invalid request');}
  else{
    services.saveCat(req.body)
    .then(response => res.redirect('/'))
    .catch(err => {throw new Error(`${err.message}`)});
  };
});

router.get('/add/breed', (req, res) => {
   res.render('addBreed');
});
router.post('/add/breed', (req, res) => {
    if(req.body.breed == ``){return res.status(400).send('Invalid request');}
    else{
        services.saveBreed(req.body)
        .then(response => res.redirect('/'))
        .catch(err => {throw new Error(`${err.message}`)});
    };
});

module.exports = router;