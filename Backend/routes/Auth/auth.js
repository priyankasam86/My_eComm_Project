let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let config = require("config");
let User = require("../../dbModel/user");
let Joi = require("@hapi/joi");
let auth = require("../middleware/userauth");

router.get("/me", auth, async(req, res) =>{

    let data = await User.userModel.findById(req.user._id).select("-UserLogin.Password -isAdmin");
    //excluded password and isAdmin field above
    res.send(data);
});

router.post("/auth", async( req, res ) => {
    let {error} = authValidation(req.body);
    if(error) { return res.send(error.details[0].message)};
    
    let username = await User.userModel.findOne({ "UserLogin.Username" : req.body.UserLogin.Username });
    if(!username) { return res.status(403).send({ message : "Invalid Username" }) };

    let user = await User.userModel.findOne({ "UserLogin.EmailID": req.body.UserLogin.EmailID });
    if(!user) { return res.status(403).send({ message : "Invalid Email ID" }) };
    
    // let password =await User.findOne({ "UserLogin.Password" : req.body.UserLogin.Password });
    // if(!password) { return res.status(403).send({ message : "Invalid Password"}) };

    let password = await bcrypt.compare(req.body.UserLogin.Password, user.UserLogin.Password);
    if(!password) { return res.status(403).send({ message : "Invalid Password"}) };

    // let token = jwt.sign({_id : user._id}, config.get("apitoken"));
    let token = user.UserToken();
    
    res.header("x-auth-token", token).send({ message : "LOGIN SUCCESSFUL", token: token});
});

function authValidation (error){
    let schema = Joi.object({
        UserLogin : {
            Username : Joi.string().required(),
            EmailID : Joi.string().required().email(),
            Password : Joi.string().required()
        }
    });

    return schema.validate(error);
};

module.exports = router;