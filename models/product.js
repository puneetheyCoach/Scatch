const { text } = require('express');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: {
        type: String,
        default: '#ffffff'
    },
    panelcolor: {
        type: String,
        default: '#f0f0f0'
    },
    textcolor: {
        type: String,
        default: '#000000'
    },
});

module.exports = mongoose.model('Product', productSchema);