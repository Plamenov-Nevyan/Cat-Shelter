const { User } = require('../models/User')
const bcrypt = require('bcrypt')
const authConstants = require('../config/authConstants')

const createUser = async (userData) => {
    if(userData.password !== userData.rePass){throw new Error('Passwords must match!')}
   let [result, hash] = await Promise.all([
    checkIfUserExists(userData.username),
    bcrypt.hash(userData.password, authConstants.saltRounds)
   ])
    if(!result){
        return User.create({
            username: userData.username,
            email: userData.email,
            password: hash
        })
    }
    else{
        throw new Error(`Úser already exists!`)
    }
  }

const loginUser = async (userData) => {
let user = await User.findOne({email:userData.email})
if(user){
    let isAuthenticated = await bcrypt.compare(userData.password, user.password) 
    if(!isAuthenticated){
        throw new Error('You entered invalid password!')
    }
    return user
}
else{
    throw new Error('You entered invalid email!')
}
}

const checkIfUserExists = (username) => User.exists({username})

const getUserWithCats = (userId) => User.findById(userId)
.populate({
    path: 'catsAdded',
    populate: {
        path: 'owner',
        model: 'User'
    }
})
.lean()


module.exports = {
    createUser,
    loginUser,
    getUserWithCats
}