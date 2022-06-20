const router = require('express').Router();
const catServices = require('../services/catsServices');

router.get('/edit/:catId', async (req, res) => {
    let [cat, breeds] = await Promise.all([
        catServices.getOneCat(req.params.catId),
        catServices.getAllBreeds()
    ])
    let imageFilename = cat.imageUrl.slice(cat.imageUrl.lastIndexOf('/') + 1)
    res.render('editCat', {cat, breeds, imageFilename});
});
router.post('/edit/:catId', (req, res) => {
 if(Object.values(req.body).includes(``)){res.status(400).send('Invalid request!');}
 else{
    catServices.updateCat(req)
     .then(() => res.redirect(`/cats/edit/${req.params.catId}`))
     .catch(err => {throw new Error(`${err.message}`)})
 };
});

router.get('/shelter/:catId', async (req, res) => {
    let cat = await catServices.getOneCat(req.params.catId);
    res.render('shelterCat', {cat, user:req.user});
});

router.post('/shelter/:catId', async (req, res) => {
    catServices.shelterCat(req.params.catId, req.user._id)
    .then(() => res.redirect('/'))
    .catch(err => {throw new Error(`${err.message}`)})

})
module.exports = router;