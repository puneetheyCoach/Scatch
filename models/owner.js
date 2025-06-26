const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    products: {
        type: Array,
        default: [],
        ref: 'Product'
    },
    contact: BigInt,
    picture: {
        type: String
    },
    gstin: {
        type: String
    },
});

module.exports = mongoose.model('Owner', ownerSchema);