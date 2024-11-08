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
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'owner',  // Reference to the owner collection
        required: true,
    },
    image: Buffer,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: Number(0),
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
});

module.exports = mongoose.model('product', productSchema)
