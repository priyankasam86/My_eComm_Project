let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let Product = require("../../dbModel/product");

// Fetch All Category
router.get("/allCategory", async( req, res )=> {
    let productData =await Product.productModel.find();
    res.send({d: data});
});

// Fetch Category By ID
router.get("/categoryById/:id", async( req, res ) => {
    let productDataById = await Product.productModel.findById(req.params.id);
    if(!productDataById) { return res.status(404).send({ message : "Invalid Product"}) };
    res.send({data: productDataById});
});

// Insert Product 



