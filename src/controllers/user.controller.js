const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HttpResponse = require('../models/http-response');
const User = require('../models/user');

const signup = async (req,res) => {
    console.log(req.body)
    const {name,phone,email,password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email })    
        
    } catch(err){
        const error = new HttpResponse(
            "Signup failed",
            500
        );
        return res.status(500).json({response:error});
    }

    if(existingUser) {
        const error =new HttpResponse (
            "user exist,login please",
            422
        ); return res.status(422).json({response:error});
    }
     let hashedPassword;
     try{
         hashedPassword =await bcrypt.hash(password, 12);

     } catch (err) {
         const error = new HttpResponse(
             "hashing failed",
             500
         ); return res.status(500).json({response:error});
     }

     const creatUser =new User({
         name,
         phone,
         email,
         password:hashedPassword

     });
     try {
         await creatUser.save();
     } catch(err) {
         const error = new HttpResponse(
             "some error",
             500
         ); return res.status(500).json({response:error});
     }
     let token;
     try {
         token =jwt.sign({userId: creatUser.id ,email: creatUser.email,userType: creatUser.userType},
            "themohitgaur",
            {expiresIn: '1h'}
            );
     } catch (err){
        const error = new HttpResponse(
            "token gen failed",
            500
        ); return res.status(500).json({response:error});
        } 

        res.status(201).json({
            userId: creatUser.id,
            phone: creatUser.phone,
            email:creatUser.email            
        });
};

const login = async (req,res) => {
    const {email,password} =req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email: email})
    } catch(err) {
        const error = new HttpResponse(
            "something went wrong",
            500
        ); return res.status(500).json({response: error});
    }

    if(!existingUser) {
        const error = new HttpResponse(
            "invalid data",
            401
        ); return res.status(401).json({response: error});
    }
    let isValidPassword;
    try {
        isValidPassword =await bcrypt.compare(password, existingUser.password);
     } catch(err){
      const error = new HttpResponse(
            "something went wrong",
            500
        ); return res.status(500).json({response: error});
      }

    if(!isValidPassword){
        const error = new HttpResponse('Wrong password ', 401);
    return res.status(401).json({ response: error });

    }
    let token;
    try {
        token = jwt.sign({userId: existingUser.id , email: existingUser.email, userType: existingUser.userType},
           "themohitgaur",
            {expiresIn: '1h'});
    } catch(err){
            const error = new HttpResponse (
                "Token Gen Failed",
                500
            ); return res.status(500).json({response:error});
    }
    console.log(existingUser);
    res.json({
        userId:existingUser.id,
        phone:existingUser.phone,
        email: existingUser.email,
        token: token
    });
    console.log(token);

};

exports.signup =signup;
exports.login=login;