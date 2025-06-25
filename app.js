const express = require('express');
const app =  express();
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) =>{
    res.render('index', { title: 'Home' });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})