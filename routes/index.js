const express = require('express');
const router = express.Router();
const isloggedin = require("../middlewares/isloggedin")
const productModel = require("../models/product")

router.get('/', (req, res) => {
  const error = req.flash('error');
  const success = req.flash('success')
  res.render('index', {error, success});
});

router.get('/shop',isloggedin, async function(req, res){
  const error = req.flash("error");
  const products = await productModel.find();
  res.render('shop', {products, error});
});

router.get('/shop/discount',isloggedin, async function(req, res){
  try {
    const products = await productModel.find();
    const discountedproducts = products.filter(product => product.discount > 0);
    res.render('shop', { products: discountedproducts}); // 'products' because your EJS uses it
  } catch (err) {
    console.error("Error fetching discounted products:", err);
    res.status(500).send("Server Error");
  }
});

router.get('/shop/discount/lt50',isloggedin, async function(req, res){
  try {
    const products = await productModel.find();
    const discountedproducts = products.filter(product => (product.discount < 50 && product.discount >0));
    res.render('shop', { products: discountedproducts }); // 'products' because your EJS uses it
  } catch (err) {
    console.error("Error fetching discounted products:", err);
    res.status(500).send("Server Error");
  }
});

router.get('/shop/discount/gt50',isloggedin, async function(req, res){
  try {
    const products = await productModel.find();
    const discountedproducts = products.filter(product => product.discount > 50);
    res.render('shop', { products: discountedproducts }); // 'products' because your EJS uses it
  } catch (err) {
    console.error("Error fetching discounted products:", err);
    res.status(500).send("Server Error");
  }
});


module.exports = router;