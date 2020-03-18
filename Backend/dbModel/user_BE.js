let Joi = require("@hapi/joi");
let mongoose = require("mongoose");
let config = require("config");
let jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema({
    FirstName : {type:String, min:3, max:200, required:true, trim : true},
    LastName : {type:String, min:3, max:200, required:true, trim : true},
    UserLogin :
        {
            Username : {type: String, min:3, max:50, required : true,unique : true,trim : true},
            EmailID : {type : String, alphanum :true, required :true, unique : true},
            Password : {type: String, min:3, max:50, required: true}
        },
    MobileNo : {type : Number , required : true},
    resetPasswordToken : {type : String},
    resetPasswordExpires : {type : Date},
    isAdmin : {type : Boolean}
});

userSchema.methods.UserToken = function () {
    let token = jwt.sign({_id : this._id, isAdmin : this.isAdmin}, config.get("apitoken"));
    return token;
}

let userModel = mongoose.model("userData", userSchema);

function userValidation(error){
    let schema = Joi.object({
        FirstName : Joi.string().required().min(3).max(200),
        LastName : Joi.string().required().min(3).max(200),
        MobileNo : Joi.number().required(),
        UserLogin:{
            Username : Joi.string().required(),
            EmailID : Joi.string().required().email(),
            Password : Joi.string().required()
        }
    });

    return schema.validate(error);
}


module.exports = {userModel, userValidation};