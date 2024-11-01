const mongoose = require('mongoose');

const uri = 'mongodb+srv://adarshdewanand912:kQaJsRrv9qSx6a7B@cluster0.37zx6.mongodb.net/BackProOne?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
    .then(function () {
        console.log("connected");
    })
    .catch(function (err) {
        console.log(err);
    });


module.exports = mongoose.connection;