const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    email: {
         type: String,
         required: true,
         minlength: 10
    },
    password: {
        type:String,
        required: true
    },
    catsAdded:[{
        type: mongoose.Types.ObjectId,
        ref: 'Cat'
    }],
    catsSheltered: []
})

const User = mongoose.model('User', userSchema)
exports.User = User