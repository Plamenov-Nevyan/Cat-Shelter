const mongoose = require('mongoose');
const dbUrl = `mongodb://localhost:27017/catShelter`;

module.exports = () => mongoose.connect(dbUrl)