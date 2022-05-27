let cats = require('../database/cats.json')
let breeds = require('../database/breeds.json')
const fs = require('fs/promises')

const getOneCat = (catId) => cats.find(cat => cat.id == catId)

const getAllCats = () => cats

const getAllBreeds = () => breeds


module.exports = {
    getOneCat,
    getAllCats,
    getAllBreeds
}