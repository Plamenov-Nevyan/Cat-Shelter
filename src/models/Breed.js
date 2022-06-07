const mongoose = require('mongoose')

const breedSchema = new mongoose.Schema({
    breed: String
})

const Breed = mongoose.model('Breed', breedSchema)
exports.Breed = Breed