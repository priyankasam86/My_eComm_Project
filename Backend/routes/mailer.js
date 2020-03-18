let express = require("express");
let router = express.Router();
let nodemailer = require("nodemailer");
let crypto = require("crypto");
let User = require("../dbModel/user");

router.post("/nodemailer", async(req, res) => {
    let user = await User.userModel.findOne({ "UserLogin.EmailID" : req.body.UserLogin.EmailID });
    if(!user) { return res.status(403).send({ message : "Invalid Email ID" }) };
    let token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000 // after 1 hr token will expire
    await user.save();

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'priyankashinde607@gmail.com', // generated ethereal user
            pass: 'pr1yank@86' // generated ethereal password
        }
    });

    if (!transporter) res.status(401).send({
        message: 'something went wrong'
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"My Ecommerce Project:" <priyankashinde607@gmail.com>', // sender address
        to: user.UserLogin.EmailID, // list of receivers
        subject: 'Reset Your Password', // Subject line:smile:
        text: 'open this link to change your password http://localhost:4200/forgotpassword/' + token // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    res.send({message :"Please Check your mail box", d: user});
});

module.exports = router; 