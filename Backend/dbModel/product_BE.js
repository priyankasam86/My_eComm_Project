let mongoose = require("mongoose");

// Sub-category schema

let subCategorySchema = new mongoose.Schema({
    SubCatName: {type : String, required : true, minlength:3, maxlength : 100}
});

let subCategoryModel = mongoose.model('subCategoryData', subCategorySchema);

// Category schema
let categorySchema = new mongoose.Schema({
    CategoryName : {type : String, required : true, minlength:3, maxlength: 100},
    SubCat : [subCategorySchema]
});

let categoryModel = mongoose.model('categoryData', categorySchema);

// Product Schema

let productSchema = new mongoose.Schema({
    ProductName : {type : String, required : true, minlength :3, maxlength : 200},
    Image : {type: String, required : true},
    Description : {type:String, required : true, minlength:3, maxlength: 1000},
    Price : {type: Number, required : true},
    Category : {type : String, required : true, minlength:3, maxlength : 100},
    SubCategory : {type : String, required : true, minlength:3, maxlength : 100},
    ProductIsAvailable :{type : Boolean, required : true}, 
    isAdmin : {type :Boolean}
});

let productModel = mongoose.model('ProductData', productSchema);

module.exports = {productModel, categoryModel, subCategoryModel}
