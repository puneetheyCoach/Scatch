  const express = require('express');
  const router = express.Router();
  const ownerModel = require('../models/owner');
  const isloggedin = require('../middlewares/isloggedin');

  if(process.env.NODE_ENV === 'development') {
    router.post('/create', async function(req, res){
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res.status(500).send("You don't have permission to create an owner");
        }

        let {name, email, password, picture, gstin} = req.body;
        let createdOwner = await ownerModel.create({
            name,
            email,
            password,
            picture,
            gstin
        });
        res.status(201).send(createdOwner);
    });
  }

  router.get('/admin',isloggedin, async(req, res) => {
    const owner = await ownerModel.findOne({email: req.user.email});
    if(owner){
      const success = req.flash('success');
    res.render('createproducts', {success});
    }
    else{
      req.flash("error","You are not allowed to access admin");
      res.redirect('/shop');
    }
    
  });

  module.exports = router;