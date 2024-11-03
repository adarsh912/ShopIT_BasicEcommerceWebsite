const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken')


module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) {
            // return res.status(401).send("you already have an account . please log  in")
            req.flash("error", "you have an account, please login");
            return res.redirect('/');
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    res.send(err.message);
                } else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });

                    //set the jwt fields which may require in future
                    //securing jwt key in config folder
                    // let token = jwt.sign({ email, id: user._id }, "secretkey",);
                    //bring form the util/generateToken
                    let token = generateToken(user);
                    res.cookie("token", token);
                    // res.send("user created sucessfully");

                }
            });

        });


    } catch (error) {
        res.send(err.message);
    }


};

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) {
        // return res.send("Please Create an account");
        req.flash('error', "email or password incorrect");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            //user exist and valid one ...so set the token
            let token = generateToken(user);
            res.cookie('token', token);
            // res.send("you can login ");
            res.redirect("/shop");
        }

        else {
            // res.send("email or password incorrect ");
            req.flash('error', "email or password incorrect");
            return res.redirect("/");
        }
    })
};

module.exports.logout = function (req, res) {
    res.cookie('token', '');
    res.redirect('/');
}