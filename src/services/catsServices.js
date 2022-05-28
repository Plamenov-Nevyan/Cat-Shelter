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

const saveCat = async (newCat, req) => {
  newCat.id = uuidv4();
if(req.files.length > 0){
  let fileExtension = await fileProcessing(req, newCat.id);
  try{
    newCat.imageUrl = `/static/images/cat-${newCat.id}.${fileExtension}`;
    cats.push(newCat);
    return fs.writeFile(path.resolve('src', 'database', 'cats.json'), JSON.stringify(cats, ``, 4), 'utf-8');
  }catch(err){
    throw new Error(`${err.message}`);
  };
}
else {
  cats.push(newCat);
  return fs.writeFile(path.resolve('src', 'database', 'cats.json'), JSON.stringify(cats, ``, 4), 'utf-8');
}

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

const fileProcessing = async (req, catId) => {
  let fileExtension = req.files[0].originalname.split(`.`)[1];
 let fileReceived = await fs.readFile(req.files[0].path);
 await fs.writeFile(`../../Express-and-Handlebars/Cat-Shelter/public/images/cat-${catId}.${fileExtension}`, fileReceived);
 return fileExtension
};

module.exports = {
    getOneCat,
    getAllCats,
    getAllBreeds,
    saveCat,
    saveBreed,
    updateCat,
    fileProcessing
};