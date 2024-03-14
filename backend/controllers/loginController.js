const User = require('../models/userMode');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accessTokenTime = '10min';
const refreshTokenTime = '60min';
const handleLogin = async (req,res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check if email exists
  User.findOne({$or: [{ email: email }, {username: email}]})

  // if email exists
  .then((user) => {
    // compare the password entered and the hashed password found
    bcrypt
      .compare(password, user.password)

      // if the passwords match
      .then((passwordCheck) => {

        // check if password matches
        if(!passwordCheck) {
          return res.status(400).send({
            message: "Incorrect password.",
          });
        }

        //   create JWT token
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
            userName:user.username
            
          },
          "RANDOM-TOKEN",
          { expiresIn: accessTokenTime }
        );
        const refreshToken = jwt.sign(
            { "username": user.username },
           "REFRESH-TOKEN",
            { expiresIn: refreshTokenTime }
        );

        user.refreshToken = refreshToken;
        user.save()
            .then((result)=>{
                console.log(result);
                res.cookie('jwt',refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
                res.status(200).send({
                    // message: "Login Successful",
                    // email: user.email,
                    // username: user.username,
                    token,
                });
            }).catch((error) => {
                res.status(500).send({
                    message: "Error creating user",
                    error,
                });
            });
        //   return success res

      })
        // Catches the error from the bcrypt.compare, since passwordsMatch checks if passwords match
      .catch((error) => {

        res.status(500).send({
          message: "Error comparing passwords",
          error,
        });
      });
  })
  // catch error if email does not exist
  .catch((e) => {
    res.status(404).send({
      message: "Email not found",
      e,
    });
  });
    
}

module.exports = {handleLogin};