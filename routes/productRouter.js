  const express = require('express');
  const router = express.Router();
  const upload = require('../config/multer-config');
  const ProductModel = require('../models/product');

  // router.get('/', async (req, res) => {
  //   try {
  //   const products = await ProductModel.find(); // fetch from DB
  //   res.render('shop', {
  //     products,
  //     error: req.flash('error'),
  //     success: req.flash('success')
  //   });
  // } catch (err) {
  //   console.error("Error fetching products:", err);
  //   req.flash('error', 'Unable to load products');
  //   res.render('shop', {
  //     products: [],
  //     error: req.flash('error'),
  //     success: req.flash('success')
  //   });
  // }
  // });

  router.post('/create', upload.single("image"), async (req, res) => {
    try{
      const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    const productData = await ProductModel.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      image: req.file.buffer
    });
    req.flash('success', 'Product created successfully');
    res.redirect('/owners/admin');
    }
    catch (err) {
      console.error("Error creating product:", err);
      req.flash('error', 'Unable to create product');
      res.redirect('/products');
    }
  });

  module.exports = router;