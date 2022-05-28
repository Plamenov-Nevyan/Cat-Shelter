let cats = require('../database/cats.json');
let breeds = require('../database/breeds.json');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');

const getOneCat = (catId) => cats.find(cat => cat.id == catId);

const getAllCats = (search) => {
if(!search.breed){return cats}
else{
  let searchedCats = cats.filter(cat => cat.breed.includes(search.breed));
  return searchedCats;
 };
};

const getAllBreeds = () => breeds;

const saveCat = (newCat) => {
  newCat.id = uuidv4();
  cats.push(newCat);
  return fs.writeFile(path.resolve('src', 'database', 'cats.json'), JSON.stringify(cats, ``, 4), 'utf-8');
};

const saveBreed = (newBreed) => {
    breeds.push(newBreed);
    return fs.writeFile(path.resolve('src', 'database', 'breeds.json'), JSON.stringify(breeds, ``, 4), 'utf-8');
};

const updateCat = (updatedInfo, catId) => {
  cats.forEach( (cat, index) => {
    if(cat.id == catId){
      updatedInfo.id = cat.id;
         cats.splice(index,1, updatedInfo);
        return;
    };
  });
  return fs.writeFile(path.resolve('src', 'database', 'cats.json'), JSON.stringify(cats, ``, 4), 'utf-8');
};


module.exports = {
    getOneCat,
    getAllCats,
    getAllBreeds,
    saveCat,
    saveBreed,
    updateCat
};