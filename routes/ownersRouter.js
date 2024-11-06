const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const isLoggedIn = require('../middlewares/isLoggedIn');
const ProductModel = require('../models/product');




// console.log(process.env.NODE_ENV); //gives 'undefine if the env is not setup...to set env ...:  export NODE_ENV=development  

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        // res.send("its working owner");
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res
                .status(500)
                .send("you dont have permision to create the owner");
        }


        // res.send("we can create a newowner");
        let { fullname, email, password } = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,

        });

        res.status(201).send(createdOwner);

    });
}

router.get('/createnewproduct', (req, res) => {
    let success = req.flash("success");
    res.render('createproducts', { success });
});

router.get('/allproducts', isLoggedIn, async (req, res) => {
    // let success = req.flash("success");

    const products = await ProductModel.find({ ownerId: req.user._id });
    res.render('allproducts', { products });

    // console.log(products);
    // res.render('admin');
});

router.get('/deleteitem/:id', async (req, res) => {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.redirect('/owners/allproducts');
});

router.get('/editproduct/:id', async (req, res) => {

    const product = await ProductModel.findById(req.params.id);
    // console.log(product);
    if (!product) {
        return res.status(404).send("Product not found");
    }
    res.render('editproduct', { product });
});

router.post('/editproduct/:id', async (req, res) => {

    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
    });

    if (!updatedProduct) {
        return res.status(404).send("Product not found");
    }

    res.redirect('/owners/allproducts');

});



module.exports = router;