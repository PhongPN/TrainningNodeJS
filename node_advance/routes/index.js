var express = require('express');
var router = express.Router();
var User = require('../model/user.model');
const { use } = require('../app');
const jwt = require('../utils/jwt');
const bcrypt = require ('bcrypt');
/* GET home page. */
router.get('/',function(req, res, next){
  res.send('Hello World')
})

//Login and generate JWT
router.get('/login',async(req, res, next)=>{ 
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({ username: username })
  .then((user) => {
    if (password == user.password) {
      let token = jwt.generateToken(user,process.env.TOKEN_SECRET,process.env.TOKEN_LIFE)
      res.json(token);
    }
  })
  .catch((err) => {
    res.sendStatus(404).send(err);
  });
})

// Create TodoList
router.post('/user', function(req,res,next){
    User.create(req.body)
    .then(user =>{
      res.send(user);
    })
    .catch((err) => {
      res.sendStatus(404).send(err);
    });
})

//Get all user
router.get('/user', function(req, res, next) {
  User.find()
    .then(user =>{
      user = user.map( user =>{
        console.log(user)
        return{'Fullname': user.userfirstname+' '+user.userlastname, "role": user.role}

      })
      res.send(user);
    })
    .catch((err) => {
      res.sendStatus(404).send(err);
    });
});

//Get user
router.get('/user/:id', function(req, res, next){
  let id = req.params.id
  User.findOne({ id: id })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.sendStatus(404).send(err);
    });
})

//Upadte user
router.put('/:id', function(req, res, next){
  let id = req.params.id
  Todo.findByIdAndUpdate({ id: id }, req.body)
    .then(() => {
    User.findById({ id: id }).then((user) => {
      res.send(user);
    });
  })
  .catch((err) => {
    res.sendStatus(404).send(err);
  })
})

//Delete user
router.delete('/:id', function(req,res,next){
  Todo.findByIdAndRemove(req.params.id)
    .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    res.sendStatus(404).send(err);
  });
})

module.exports = router;
