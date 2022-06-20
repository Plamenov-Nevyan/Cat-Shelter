const router = require('express').Router();
const catServices = require('../services/catsServices')
const userServices = require('../services/userServices')
const authConstants = require('../config/authConstants')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    catServices.getAllCats(req.query)
    .then((cats) => {
        cats.forEach((cat) => {
            if(req.user){cat.isOwner = cat.owner._id == req.user._id}
        })
        res.render('home', {cats})
    })
    .catch(err => {throw new Error(err)})
});


router.get('/add/cat',(req, res) => {
     catServices.getAllBreeds()
    .then((breeds) => {res.render('addCat', {breeds})})
    .catch(err => {throw new Error(err.message)})
});
router.post('/add/cat', async (req, res) => {
   if(Object.values(req.body).includes(``)){return res.status(400).send('Invalid request');}
  else{
    catServices.saveCat(req)
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
        catServices.saveBreed(req.body)
        .then(response => res.redirect('/'))
        .catch(err => {throw new Error(`${err.message}`)});
    };
});

router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/register', (req,res) => {
    userServices.createUser(req.body)
    .then((user) => {
        let token = jwt.sign({username: user.username, _id: user._id}, authConstants.secret, {expiresIn:'2d'})
        res.cookie(authConstants.cookieName,token,{httpOnly:true})
        res.redirect('/')
    })
    .catch(err => {throw new Error(err.message)})
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
  let user = await userServices.loginUser(req.body)
  let token = jwt.sign({username:user.username, _id:user._id}, authConstants.secret, {expiresIn:'2d'})
  res.cookie(authConstants.cookieName, token, {httpOnly:true})
  res.redirect('/')
})


router.get('/logout', (req, res) => {
    res.clearCookie(authConstants.cookieName)
    res.redirect('/')
})

router.get('/profile/:userId', (req, res) => {
    let userWatching = req.user
    userServices.getUserWithCats(req.params.userId)
    .then((user) => {
        user.catsAdded.forEach(cat => cat.isOwner = String(cat.owner._id) == String(user._id))
        res.render('profile', {user, userWatching})
    })
    .catch(err => {throw new Error(err.message)})
})

module.exports = router;