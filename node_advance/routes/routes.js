// const jwt = require('jsonwebtoken');
// const BodyParser = require("body-parser");

// const router = app => {
//     app.get("/", (request, response) => {
//         response.send({
//             message: 'Node.js and Express REST API'
//         });
//     });

//     app.get("/login", (request, response) => {
//         let username = "admin";
//         let userpass = "123456";
//         if(username=="admin"&&userpass=="123456"){
//             response.send(username);
//         }
//     });
// };

// // Export the router
// module.exports = router;

const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/authen");
const authController = require("../controller/authencontroller");
const userController = require("../controller/usercontroller");

/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAPIs = (app) => {
  router.post("/login", authController.login);
  
  // // Sử dụng authMiddleware.isAuth trước những api cần xác thực
  // router.use(authMiddleWare.isAuth);
  // // List Protect APIs:
  // router.get("/users", userController.userLists);
  // // router.get("/example-protect-api", ExampleController.someAction);

  return app.use("/", router);
}

module.exports = initAPIs;