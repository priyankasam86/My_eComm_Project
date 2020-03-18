let express = require("express");
let router = express.Router();
let Product = require("../dbModel/product");

router.post("/pagination/:page", async( req, res) => {

    let perPage = 10;
    let currentPage = req.params.page || 1;
    let data = await Product.productModel
                    .find()
                    .skip((perPage * currentPage) - perPage)
                    .limit(perPage);
    let totalCount = await Product.productModel.find().count();
    let totalPages = Math.ceil(totalCount/perPage);
    res.send({
        perPage: perPage,
        currentPage : currentPage,
        data : data,
        totalCount : totalCount,
        totalPages : totalPages
    })
});

module.exports = router;