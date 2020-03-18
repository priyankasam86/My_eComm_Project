let express = require("express");
let router = express.Router();
let Contact = require("../../dbModel/contact_BE");

router.post("/contactus", async( req, res ) => {
    
    let {error} = Contact.authValidation(req.body);
        if(error) { return res.send(error.details[0].message)};

    let data = new Contact({
        Name : req.body.Name,
        EmailID : req.body.EmailID,
        Comment : req.body.Comment
    });

    let item =await data.save();
    res.send({ message : "THANK YOU!", i: item });
});


module.exports = router;
