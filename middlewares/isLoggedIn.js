const jwt = require('jsonwebtoken');
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect("/");
        //we can access the flash msg on the redirect route also
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const user = await userModel
            .findOne({ email: decoded.email })
            .select("-password");
        req.user = user;
        next();
    } catch (err) {
        req.flash("error", "Something went wrong.");
        res.redirect("/");
    }
};
