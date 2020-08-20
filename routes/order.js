const { verifyToken } = require("../helper/jwt");

module.exports = app => {
    const orders = require("../controller/category");

    var router = require("express").Router();

    // Create a new product
    router.post("/", verifyToken, orders.create);
  
    // Retrieve all products
    router.get("/", verifyToken, orders.findAll);
  
    // Retrieve a single product with id
    router.get("/:id", verifyToken, orders.findOne);
  
    // Update a product with id
    router.put("/:id", verifyToken, orders.update);
  
    // Delete a product with id
    router.delete("/:id", verifyToken, orders.delete);
    
    app.use('/orders', router);
  };