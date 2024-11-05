const mongoose = require('mongoose');
const config = require('config'); //npm i config

//use of debugger .... npm i debug
//to show the output env variable must be se..... export DEBUG=development:*
const dbgr = require('debug')("development:mongoose");


// space in the folder name encoded as %20
mongoose.connect(`${config.get("MONGODB_URI")}/14%20BP1`, {
    serverSelectionTimeoutMS: 30000, // 30 seconds 
})
    .then(function () {
        dbgr("connected");
    })
    .catch(function (err) {
        dbgr(err);
    });


module.exports = mongoose.connection;