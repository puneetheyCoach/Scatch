const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: [],
        ref: 'Product'
    },
    orders: {
        type: Array,
        default: [],
        ref: 'Product'
    },
    contact: BigInt,
    picture: {
        type: String
    },
});

module.exports = mongoose.model('User', userSchema);