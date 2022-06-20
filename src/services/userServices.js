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

const checkIfUserExists = (username) => User.exists({username})


module.exports = {
    createUser
}