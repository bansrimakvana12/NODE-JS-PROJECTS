const mongoose = require('mongoose');

const addSchema = mongoose.Schema({
    movie: {
        type: String,
        required: Array,
    },
    moviename: {
        type: String,
        required: true,
    },
    movieintro: {
        type: String,
        required: true,
    },
    movieprice: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
   
})

const users = mongoose.model("users", addSchema);
module.exports = users;