let jwt = require("jsonwebtoken");
let config = require("config");

function Userauth (req, res, next){
    let token = req.header("x-auth-token");
    if(!token){ return res.status(404).send({message: "Invalid Token"}) };
    try{
        const dcoded = jwt.verify(token, config.get("apitoken"));
        req.user = dcoded;
        next();    
    }
    catch(ex)
    {
        res.status(402).send({message : "ACCESS DENIED!"});
    }
};

module.exports = Userauth;
