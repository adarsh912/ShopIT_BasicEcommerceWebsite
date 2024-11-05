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

    image: Buffer,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0,
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
});

module.exports = mongoose.model('product', productSchema)
