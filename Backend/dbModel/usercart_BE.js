const mongoose = require("mongoose");

let cartItemSchema = new mongoose.Schema({
    prodId : { type:String, required:true, maxlength:100, minlength:1},
    name : { type:String, required:true, minlength:3, maxlength:100},
    image :{ type : String, required:true},
    price : { type:Number, required:true, minlength:1, maxlength:100},
    quantity : { type:Number, required:true, minlength:1, maxlength:100},
    totalprice : { type:Number, required:true, minlength:1, maxlength:100}
});

let cartItemRecords = mongoose.model('cartItemRecords', cartItemSchema);

let userCartSchema = new mongoose.Schema({
    userEmail : { type:String, required:true, minlength:5, maxlength:50},
    cartItem: [cartItemSchema]
});

let userCartRecords = mongoose.model('userCartRecords', userCartSchema);

module.exports = { userCartRecords,cartItemRecords };