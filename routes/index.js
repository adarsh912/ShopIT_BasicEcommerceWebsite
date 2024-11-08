const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product');
const userModel = require('../models/user-model');


router.get('/', (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");

  res.render("index", { error, success, loggedIn: false });
});

// router.get('/admin', (req, res) => {
//   // let success = req.flash("success");
//   res.render('admin');
// });


router.get('/shop', isLoggedIn, async (req, res) => {
  const products = await productModel.find();
  let success = req.flash("success"); //get this for add to cart functioninig

  res.render('shop', { products, success });

  // res.render('shop');
});

router.get('/cart', isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate("cart");

  // console.log(user.cart);


  const totalMRP = user.cart.reduce((sum, product) => sum + product.price, 0);
  const discount = user.cart.reduce((sum, product) => sum + product.discount, 0);
  const platformFee = 20;
  const shippingFee = 0;

  let success = req.flash("success");

  res.render('cart', {
    success,
    user,
    totalMRP,
    discount,
    platformFee,
    shippingFee
  });

});

router.post('/cart', isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate("cart");

  // console.log(user.cart);


  const totalMRP = user.cart.reduce((sum, product) => sum + product.price, 0);
  const discount = user.cart.reduce((sum, product) => sum + product.discount, 0);
  const platformFee = 20;
  const shippingFee = 0;

  res.render('cart', {
    user,
    totalMRP,
    discount,
    platformFee,
    shippingFee
  });

});


router.get('/deleteitem/:id', isLoggedIn, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");

    // Find the item in the cart by its ID
    let itemToDelete = user.cart.find(item => item._id.toString() === req.params.id);

    // Remove the item from the cart
    user.cart = user.cart.filter(item => item._id.toString() !== req.params.id);
    await user.save();

    req.flash("success", "removed from cart");
    res.redirect('/cart');
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});



router.get('/addtocart/:productid', isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "added to cart");
  res.redirect('/shop')
});


module.exports = router;