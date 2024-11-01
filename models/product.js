/*
product
image
name
price
discount
bg color
panel color
text color
*/
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    image: String,
    name: String,
    price: Number,
    cart: {
        type: Number,
        default: 0,
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
});

module.exports = mongoose.model('product', productSchema)
