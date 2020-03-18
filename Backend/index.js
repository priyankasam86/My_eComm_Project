let express = require("express");
let app = express();
let mongoose = require("mongoose");
let config = require("config");
let cors = require("cors");
let user = require("./routes/API/user_BE_API");
let auth = require("./routes/Auth/auth");
let mailer = require("./routes/mailer");
let forgotpassword = require("./routes/forgotpassword");
let pagination = require("./routes//pagination");
let contactus = require("./routes/API/contact_BE_API.js");

let port = process.env.port || 4600;
app.use(express.json()); 
app.use(cors());
if(!config.get("apitoken")){
    process.exit(1); // 1 - for crash process and 0 - for success
}

//connection
mongoose
    .connect("mongodb://localhost/MainDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to DB`))
    .catch(error => console.log(`Something went wrong ${error.message}`))

    app.listen(port, () =>console.log(`Connected to Port`));

    app.use("/api", user);
    app.use("/api/userLogin", auth);
    app.use("/api", contactus);
    app.use("/api", mailer);
    app.use("/api", forgotpassword);
    app.use("/api", pagination);

