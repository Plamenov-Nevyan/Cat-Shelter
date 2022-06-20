const { Cat } = require('../models/Cat')
const { Breed } = require('../models/Breed')
const fs = require('fs/promises');

const getOneCat = async (catId) => {
  let cat = await Cat.findById(catId).lean()
  return cat
};

const getAllCats = (search) => {
if(!search.breed){
  return Cat.find().populate('owner').lean()
}
else{
  return Cat.find({breed:{$regex: new RegExp(search.breed, 'i')}}).populate('owner').lean()
 };
};

const getAllBreeds = async() => {
  let breeds = await Breed.find().lean(); 
  return breeds
};

const saveCat = async (req) => {
if(req.files.length > 0){
  try{
    let newCat = await Cat.create(req.body);
    let fileExtension = await fileProcessing(req, newCat._id);
    newCat.imageUrl = `/static/images/cat-${newCat.id}.${fileExtension}`;
    newCat.owner = req.user._id
    await newCat.save();
  }catch(err){
    throw new Error(`${err.message}`);
  };
}
else {
  req.body.owner = req.user._id
  await Cat.create(req.body);
};
};

const saveBreed = async (newBreed) => {
   await Breed.create(newBreed)
};

const updateCat = async (req) => {
  let cat = await Cat.findOne({_id:req.params.catId})
  let newInfo = req.body
  if(req.files.length > 0){
    try{
      let fileExtension = await fileProcessing(req, cat._id);
      cat.imageUrl = `/static/images/cat-${cat._id}.${fileExtension}`;
    }catch(err){
      throw new Error(`${err.message}`);
    };
  }
if(Object.keys(newInfo).length > 0){
  for(let newCatInfo in newInfo){
    cat[newCatInfo] = newInfo[newCatInfo]
  }
}
 await cat.save()
};

const shelterCat = async(catId) => {
  await Cat.findOneAndRemove({_id:catId})
}

const fileProcessing = async (req, catId) => {
  let fileExtension = req.files[0].originalname.split(`.`)[1];
 let fileReceived = await fs.readFile(req.files[0].path);
 await fs.writeFile(`./public/images/cat-${catId}.${fileExtension}`, fileReceived);
 return fileExtension
};

module.exports = {
    getOneCat,
    getAllCats,
    getAllBreeds,
    saveCat,
    saveBreed,
    updateCat,
    shelterCat
};