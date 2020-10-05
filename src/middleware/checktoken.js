const jwt = require('jsonwebtoken');
const HttpResponse = require('../models/http-response');


module.exports = (req, res, next) => {
    if (req.method=='OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.spilt(' ')[1];
        if(!token) {
            throw new Error('Authencation failed');
        }
        const decodedToken = jwt.verify(token, "themohitgaur");
        req.userData = {userId:decodedToken.userId};
        next();
    } catch (err) {
        const error = new HttpResponse('Authencation Failed');
        return res.json({response:error});
    }


};