let Joi = require("@hapi/joi");
let mongoose = require("mongoose");

let contactSchema = new mongoose.Schema({

    Name : {type : String, required : true, minlength:3,maxlength:50},
    EmailID : {type : String, required : true, minlength:5,maxlength:50},
    Comment : {type : String, required:true, , minlength:3,maxlength:50} 
});

let contactModel = mongoose.model('contactData', contactSchema);
function contactValidation(error){
    let schema = Joi.object({
        Name : Joi.string().min(3).max(50).required(),
        EmailID : Joi.string().min(5).max(50).required(),
        Comment : Joi.string().min(3).max(50).required()
    });
    return schema.validate(error);
};

module.exports = {contactModel, contactValidation};

