const { verifyToken } = require("../helper/jwt");

module.exports = app => {
    const categorys = require("../controller/category");

    var router = require("express").Router();

    // Create a new category
    router.post("/", verifyToken, categorys.create);
  
    // Retrieve all category
    router.get("/", verifyToken, categorys.findAll);
  
    // Retrieve a single category with id
    router.get("/:id", verifyToken, categorys.findOne);
  
    // Update a category with id
    router.put("/:id", verifyToken, categorys.update);
  
    // Delete a category with id
    router.delete("/:id", verifyToken, categorys.delete);
    
    app.use('/categorys', router);
  };