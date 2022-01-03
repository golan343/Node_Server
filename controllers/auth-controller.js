const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authLogic = require('../business-logic/auth-logic');
const { json } = require('express');

const router = express.Router();

router.post('/register', async (request, response) => {
  try {
    const user = new User(request.body);
    const error = await user.validate();
    if(error) {
      response.status(400).json(error);
      return;
    }
    const addedUser = await authLogic.registerAsync(user);
    const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn : "30m"});
    
    addedUser.password = undefined;
    response.status(201).json({ addedUser, token });
  }
  catch(err) {
    response.status(500).send({ err: err.message });
  }
});

router.post('/login', async (request, response) => {
  try {
    const user = await authLogic.loginAsync(request.body);
    if(!user) {
      response.status(400).send('Incorrect email or password!');
      return;
    }
    const token = jwt.sign({ user }, config.jwt.secretKey, { expiresIn: '30m'});
    user.password = undefined;
    console.log('success');
    response.status(200).json({ user, token });
  }
  catch(err) {
    response.status(500).send({ err: err.message })
  }
  
});

module.exports = router;