let userLists = (req, res) => {
  const users = require("../model/user")
  return res.status(200).json(users);
}

module.exports = {
    userLists: userLists,
};