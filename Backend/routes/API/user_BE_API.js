let express = require("express");
let router = express.Router();
let User = require("../../dbModel/user");
let bcrypt = require("bcrypt");
let auth = require("../middleware/userauth");
let admin = require("../middleware/admin");

// Fetch All User Data
router.get("/fetchUserData", auth, async (req, res) => {
    let data = await User.userModel.find();
    res.send({d: data});
});

// Fetch User Data By ID
router.get("/fetchUserData/:id", async (req, res) => {
    let user = await User.userModel.findById(req.params.id);
    if(!user) { return res.status(404).send({message : "Invalid User ID"}) };
    res.send({d: user});
});

// Create User Data
router.post("/addUser", async (req, res) => {
    let user = await User.userModel.findOne({"UserLogin.EmailID" : req.body.UserLogin.EmailID });
    if (user) { return res.status(403).send({message : "This User is already exists in our database"}) };

    let {error} = User.userValidation(req.body);
    if(error) { return res.send(error.details[0].message) };

    let user_new = new User.userModel({
        FirstName : req.body.FirstName,
        LastName : req.body.LastName,
        MobileNo : req.body.MobileNo,
        UserLogin : req.body.UserLogin
    });
    let salt = await bcrypt.genSalt(10);
    user_new.UserLogin.Password = await bcrypt.hash(user_new.UserLogin.Password, salt);

    let item = await user_new.save();
    res.send({message : "THANK YOU, SUCCESSFULLY REGISTERED!", i: item});
});

router.post("/loginUser", async( req, res) => {
    let user = await User.userModel.findOne({"UserLogin.EmailID" : req.body.UserLogin.EmailID});
    if(!user) { return res.status(403).send({message : "Please register first."}) };

    let {error} = User.userValidation(req.body);
    if(error) { return res.send(error.details[0].message) };

    let loginData = new User.userModel({
        UserLogin : req.body.UserLogin
    })
});
// Update User Data
router.put("/updateUser/:id", async( req, res ) => {
    let user = await User.userModel.findById(req.params.id);
    if(!user) { return res.status(404).send({message : "Invalid User ID"}) };

    let {error} = User.userValidation(req.body);
    if(error) { return res.send(error.details[0].message) };

    user.FirstName = req.body.FirstName;
    user.LastName = req.body.LastName;
    user.MobileNo = req.body.MobileNo;
    user.UserLogin.Username = req.body.UserLogin.Username;
    user.UserLogin.EmailID = req.body.UserLogin.EmailID;
    user.UserLogin.Password = req.body.UserLogin.Password;
    let item = await user.save();
    res.send({ message : "DATA UPDATED SUCCESSFULLY!", i:item });
});

// Remove User Data
router.delete("/removeUser/:id",[auth,admin], async( req, res ) => {
    let user = await User.userModel.findByIdAndRemove(req.params.id);
    if(!user) { return res.status(404).send({message : "Invalid User ID"}) };
    res.send({ message : "REMOVED SUCCESSFULLY! VISIT US AGAIN" });
});

//IEP - INFORMATION EXPERT PRINCIPLE

module.exports = router;