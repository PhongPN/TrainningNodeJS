const { verifyToken } = require("../helper/jwt");

module.exports = app => {
    const products = require("../controller/product");

    var router = require("express").Router();

    // Create a new product
    router.post("/", verifyToken, products.create);
  
    // Retrieve all products
    router.get("/", verifyToken, products.findAll);
  
    // Retrieve a single product with id
    router.get("/:id", verifyToken, products.findOne);
  
    // Update a product with id
    router.put("/:id", verifyToken, products.update);
  
    // Delete a product with id
    router.delete("/:id", verifyToken, products.delete);
    
    app.use('/products', router);
  };