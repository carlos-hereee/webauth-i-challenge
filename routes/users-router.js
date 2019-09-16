const express = require('express');
const Users = require('./users-model.js');

//import middleware
const restricted = require('../auth/restricted-middleware.js')

const router = express.Router();

//get list of users, and pass
router.get('/', (req, res) => {
  console.log('getting users');
  Users.find()

    .then(users => {
      res.json(users);
    })
    .catch(err => {
        console.log(err);
        res.send(err)
      });
});

// make user and pass
router.post('/', (req, res) => {
  let { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 8); // it's 2 ^ 8, not 8 rounds

  Users.add({ username, password: hash })
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
});

router.get('/hash', (req, res) => {
  const name = req.query.name;

  // hash the name
  const hash = bcrypt.hashSync(name, 8); // use bcryptjs to hash the name
  res.send(`the hash for ${name} is ${hash}`);
});

module.exports= router;