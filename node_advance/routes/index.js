var express = require('express');
var router = express.Router();
var User = require('../model/user.model');
const { use } = require('../app');
const  {verifyToken}= require('../utils/jwt');
const token = require('jsonwebtoken')
const bcrypt = require ('bcrypt');
/* GET home page. */
router.get('/',function(req, res, next){
  res.send('Hello World')
})

//Login and generate JWT
router.post('/login', async(req, res) => {
  //Login a registered user
  User.verifyPassword(req.body, (token)=>{
    console.log(token)
    res.status(200).send(token)
})
})

// Create user
router.post('/register', function(req,res,next){
  if (Object.keys(req.body).length !== 0) {
    User.create(req.body).then((user) => {
      res.send(user);
    });
  } else {
    res.sendStatus(404);
  }
})

//Get all user
router.get('/user',verifyToken, function(req, res, next) {
  User.find()
    .then(user =>{
      user = user.map( user =>{
        console.log(user)
        return{'Fullname': user.userfirstname+' '+user.userlastname, 'role': user.role}

      })
      res.send(user);
    })
    .catch((err) => {
      res.sendStatus(404).send(err);
    });
});

//Get user
router.get('/user/:id',verifyToken, function(req, res, next){
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
router.put('/user/:id',verifyToken, function(req, res, next){
  let id = req.params.id
  User.findOneAndUpdate({ id: id }, req.body)
    .then(() => {
    User.findOne({ id: id }).then((user) => {
      res.send(user);
    });
  })
  .catch((err) => {
    res.sendStatus(404).send(err);
  })
})

//Delete user
router.delete('/user/:id',verifyToken, function(req,res,next){
  let id = req.params.id;
  User.findOneAndRemove({ id: id })
    .then((user) => {
    res.send("Delete user");
  })
  .catch((err) => {
    res.sendStatus(404).send(err);
  });
})

module.exports = router;
