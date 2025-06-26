const jwt = require('jsonwebtoken');

const generateTokens = (createduser) => {
    return jwt.sign({email: createduser.email, name: createduser.name, id: createduser._id},process.env.JWT_KEY);
};

module.exports = generateTokens;