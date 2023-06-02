const express = require('express');
const app = express.Router();
const { User } = require('../db');
const { isLoggedIn } = require('./middleware');

module.exports = app;

app.post('/', async(req, res, next)=> {//post the credentials to the db to find out the user, if exists, return the token
  try {
    res.send(await User.authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user);  //send the user to the store
  }
  catch(ex){
    next(ex);
  }
});

app.put('/', isLoggedIn, async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization)
    await user.update(req.body);
    res.send(user);
  }
  catch(ex){
    next(ex);
  }
});

app.post('/register', async(req, res, next)=> {
  try {
    const user = await User.create(req.body);
    res.send(user.generateToken());
  }
  catch(ex){
    next(ex);
  }
});


// app.post('/', async(req, res, next)=> {
//   try {
//     console.log('what the fuck')
//     console.log(req.body)
//     const { email, password } = req.body;
//     // res.send(await User.authenticate({ email, password }));
//     res.send(await User.authenticate(req.body));
//   }
//   catch(ex){
//     next(ex);
//   }
// });

// app.post('/register', async (req, res, next)=> {
//   try {
//     const user = await User.create(req.body);
//     res.send(user.generateToken());
//   } catch(err) {
//     next(err);
//   }
// });
  
// app.get('/', isLoggedIn, (req, res, next)=> {
//   try {
//     res.send(req.user);
//   }
//   catch(ex){
//     next(ex);
//   }
// });

// app.put('/', isLoggedIn, async(req, res, next)=> {
//   try {
//     const user = await User.findByToken(req.headers.authorization)
//     await user.update(req.body);
//     res.send(user);
//   }
//   catch(ex){
//     next(ex);
//   }
// });

// app.post('/register', async(req, res, next)=> {
//   try {
//     const user = await User.create(req.body);
//     res.send(user.generateToken());
//   }
//   catch(ex){
//     next(ex);
//   }
// });

  