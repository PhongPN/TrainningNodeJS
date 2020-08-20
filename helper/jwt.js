const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();

//Generate token
let generateToken = (user, secretSignature, tokenLife, callback) => {
    jwt.sign(
        user,
        secretSignature,
        { expiresIn: tokenLife },
        (err, token) => {
            if (err) {
                callback(err);
            } else {
                callback({ "token": token });
            }
        }
    );
}

let verifyToken = (req, res, next) => {
    const authorization = req.headers["authorization"];
    if (typeof authorization !== "undefined") {
        req.token = authorization.split(" ")[1];
        jwt.verify(req.token, process.env.TOKEN_SECRETKEY, (err, authData) => {
            console.log(err)
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
    verifyToken: verifyToken,
    generateToken: generateToken
};