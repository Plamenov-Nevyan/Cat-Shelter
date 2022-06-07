const router = require('express').Router();
const services = require('../services/catsServices')

router.get('/', (req, res) => {
    services.getAllCats(req.query)
    .then((cats) => {res.render('home', {cats})})
    .catch(err => {throw new Error(err)})
});


router.get('/add/cat',(req, res) => {
     services.getAllBreeds()
    .then((breeds) => {res.render('addCat', {breeds})})
    .catch(err => {throw new Error(err.message)})
});
router.post('/add/cat', async (req, res) => {
   if(Object.values(req.body).includes(``)){return res.status(400).send('Invalid request');}
  else{
    services.saveCat(req)
    .then(() => res.redirect('/'))
    .catch(err => {throw new Error(`${err.message}`)});
  }
})


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