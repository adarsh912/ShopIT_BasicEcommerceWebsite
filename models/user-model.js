/*
usermodel
full name- string 
email- string
pass- string
cart -string
isadmin -strng
orders -array
contact-number
picture- db 
*/

const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        },
    ],
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model('user', userSchema)
