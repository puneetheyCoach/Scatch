  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('Order page');
  });

  module.exports = router;