const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const ProductModel = require('../models/product');


router.get('/', (req, res) => {
    let error = req.flash("error");
    res.render("index", { error });
});

router.get('/shop', isLoggedIn, async (req, res) => {
    // const products = await ProductModel.find();
    // res.render('shop', { products });

    res.render('shop');
});


module.exports = router;