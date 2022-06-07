const router = require('express').Router();

const navController = require('./controllers/navController');
const catsController = require('./controllers/catsController');
router.use('/', navController);
router.use('/cats', catsController);


module.exports = router;