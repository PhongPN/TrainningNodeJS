const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
dotenv.config();
// //Generate token
// let generateToken = (user, secretSignature, tokenLife) => {
//     return new Promise((resolve, reject) => {
//       // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
//       // Thực hiện ký và tạo token
//       jwt.sign(
//         {user},
//         secretSignature,
//         {
//           algorithm: "HS256",
//           expiresIn: tokenLife,
//         },
//         (error, token) => {
//           if (error) {
//             return reject(error);
//           }
//           resolve(token);
//       });
//     });
// }

let verifyToken = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (typeof authorization !== "undefined") {
    req.token = authorization.split(" ")[1];
    jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
      if (err) {
          res.status(403).send(err)
      }
      else {
        next();
      }
    });
  } else {
    res.status(403);
  }
  }
  
module.exports = {
    verifyToken: verifyToken
};
  