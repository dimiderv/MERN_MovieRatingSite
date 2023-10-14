const fs = require("fs");
const cookieParser = require('cookie-parser')
const path = require("path");
var ObjectId = require('mongodb').ObjectId; 
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const axios = require("axios").default;
const app = express();
const verifyJWT = require('../middleware/verifyJWT');
// required for registration
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/userMode');
const TrySchema = require('../models/trySchemas');
const mySchemas = require('../models/schemas');
const auth = require('../auth');
const credentials = require('../middleware/credentials');
const corsOptions = require('../config/corsOptions');

// Could be a possible error with new Header
var cors = require("cors");

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));
//const accessLogStream = fs.createWriteStream(
//  path.join(__dirname, "logs", "access.log"),
//  { flags: "a" }
//);

//app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const testUser = {
    favorites: [],
    _id: '64fbb9e2e2046c008fd98136',
    email: 'same@gmail.com',
    password: '$2b$10$IkeHDINtJMsCkQleSQRv7u6yfq9eO0oOsr2MXuswcfW1kz7zakqYO',
    username: 'try',
    firstName: 'Miaou',
    lastName: 'Gkaou',
    birthday: '1997-09-10',
    entryDate: new Date('2023-09-09T00:18:42.140Z'),
    __v: 0,
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRyeSIsImlhdCI6MTY5NDM4NzA3MCwiZXhwIjoxNjk0NDczNDcwfQ.fDFhALY_aWB0zzk0QsFGt4GO2Ut1612ffb5Nlb--me8',
  };

app.get("/user2",async (req,res)=>{
    // console.log(req)
    // should add await i believe

        res.status(200).json(testUser)

  })

app.get('localhost/hello', async (req, res) => {
    try{
        const user=await User.findOne({username:"try"})
        console.log( JSON.stringify(user))
        res.status(200).json({ message: 'Hello, world!' });
    }catch(err){
        console.log(err)
        res.status(500).json({message:"gia ton putso"})
    }

  });

