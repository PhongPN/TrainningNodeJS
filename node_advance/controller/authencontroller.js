const jwt= require("../helper/jwt");



const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "Phong";


let login = async (req, res) => {
  try {
    let username = req.body.username;
    let userpass = req.body.userpass;
    const userFakeData = {
      _id: "1234",
      name: "Phong",
      email: req.body.email,
    };
    if(username =="admin" && userpass=="123456"){
    const accessToken = await jwt.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
    return res.status(200).json(accessToken);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = {
  login: login
}