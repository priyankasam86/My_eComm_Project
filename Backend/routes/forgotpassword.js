let express =require("express");
let router = express.Router();
let User = require("../dbModel/user");
let bcrypt = require("bcrypt");
let Joi = require("@hapi/joi");

router.post("/forgotpassword/:token", async(req, res) => {

    let user = await User.userModel.findOne({
        "resetPasswordToken":req.params.token,
        "resetPasswordExpires":{
            $gt : Date.now()
        }
    });
        if (!user) { return res.status(403).send({ message: "Invalid Token OR Token got expires"}) };
        let {error} = ValidationError(req.body);
        if(error){ return res.send(error.details[0].message)};

        let oldPassword = await bcrypt.compare(req.body.UserLogin.Password, user.UserLogin.Password);
        if(oldPassword) { return res.status(402).send({ message : "This is a old Password. Please Reset a new one"}) };
        user.UserLogin.Password = req.body.UserLogin.Password;
        user.resetPasswordExpires=undefined;
        user.resetPasswordToken=undefined;

        let salt = await bcrypt.genSalt(10);
        user.UserLogin.Password = await bcrypt.hash(user.UserLogin.Password, salt);
        await user.save();
        res.send({ message : "PASSWORD UPDATED SUCCESSFULLY"});
});

function ValidationError(error){
    let Schema = Joi.object({
        UserLogin:{
            EmailID: Joi.string().required(),
            Password : Joi.string().required()
        }
    });
    return Schema.validate(error);
}

module.exports = router;