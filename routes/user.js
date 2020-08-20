const { verifyToken } = require("../helper/jwt");

module.exports = app => {
    const users = require("../controller/user");

    var router = require("express").Router();

    // Login
    router.post("/login", users.login);

    // Create a new user
    router.post("/", verifyToken, users.create);
  
    // Retrieve all users
    router.get("/", verifyToken, users.findAll);
  
    // Retrieve a single user with id
    router.get("/:id", verifyToken, users.findOne);
  
    // Update a user with id
    router.put("/:id", verifyToken, users.update);
  
    // Delete a user with id
    router.delete("/:id", verifyToken, users.delete);
    
    app.use('/users', router);
  };