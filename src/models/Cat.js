const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Cat name is required!'],
    },
    imageUrl: {
        type: String,
        default: `...`
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    breed: {
        type: String,
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    owner : {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Cat = mongoose.model('Cat', catSchema)
exports.Cat = Cat