const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
var uuid = require('uuid');
var createError = require('http-errors')

//TODO connect to DB
const userMap = new Map();
userMap.set("email@email.com", {
    uid: "1",
    name: "bob",
    pass: "123"
})

exports.getUsers = (req,res,next) => {
    console.log(req.userData);
    let users = [];
    for (const [key, value] of userMap) {
        users.push(value)
      }
    console.log(users)
    res.status(201).json(users);
}


exports.createUser = async (req, res, next) => {
    
  const { name, email, password } = req.body;
    let uid = uuid.v4();
    let hash;
    if(userMap.has(email)){
        return next(createError(500, 'Email is already registered!'));
    }

    try{
        hash = await bcryptjs.hash(password, 10);
    }catch (err) {
        console.log(err);
        return next(createError(500, 'Internal Server Error.'));
    }

    userMap.set(email, {uid: uid, name: name, pass: hash})
    try{
        //TODO: Replace with real DB. will be async
        
    }catch(err){
        return next(
            createError(
                500,
                'Failed to Signup! Please try again later.'
                )
            )
    }
    

    let token;
    token = jwt.sign(
        {email: email, uid: uid},
        "JWT_KEY_PLEASE_CHANGE_THIS",
        {expiresIn: "24hr"}
    );
    res.status(201).json({uid: uid, token: token});
}


exports.login = async (req, res, next) => {
    
    const {email, password} = req.body;

    if(!userMap.has(email)){
        return next( 
            createError(
                401,
                'The provided credentials did not make any in our system.'
        ));
    }
    
    let user;
    try{
        //TODO: Replace with real DB. will be async
        user = userMap.get(email)
    }catch(err){
        return next(createError(
            500,
            'Fail to retrive user.'
        ));
      }

    let result;
    try{
        result = await bcryptjs.compare(password, user.pass)
    }catch(err){
        return next(createError(
            500,
            'Fail to retrive user.'
        ));
    }

    if(!result){
          return next(createError(
            401,
            'The provided credentials did not make any in our system.'
        ));
    }

    let token;
    let uid = user.uid
    token = jwt.sign(
        {email: email, uid: uid},
        "JWT_KEY_PLEASE_CHANGE_THIS",
        {expiresIn: "24hr"}
    );
    
    res.status(200).json({uid: uid, token: token});
  }