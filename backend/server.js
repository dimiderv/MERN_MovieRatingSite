const fs = require("fs");
const path = require("path");
var ObjectId = require('mongodb').ObjectId; 
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const axios = require("axios").default;
const Goal = require("./models/Goal");
const app = express();
// required for registration
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('./models/userMode');
const mySchemas = require('./models/schemas');
const auth = require('./auth');
// Could be a possible error with new Header
var cors = require("cors");
app.use(cors());
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE,PUT, PATCH, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  next();
});

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});



/*===============================Login and Registration of users======================*/
// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
        username:request.body.username
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({$or: [{ email: request.body.email }, {username: request.body.email}]})

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.username,
              
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password do not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

/**====================================End of Authentication===========================**/
app.get("/goals", async (req, res) => {
  console.log("TRYING TO FETCH GOALS");
  try {
    const goals = await Goal.find();
    res.status(200).json({
      goals: goals.map((goal) => ({
        id: goal.id,
        text: goal.text,
      })),
    });
    console.log("FETCHED GOALS");
    console.log(goals)
  } catch (err) {
    console.error("ERROR FETCHING GOALS");
    console.error(err.message);
    res.status(500).json({ message: "Failed to load goals." });
  }
});
app.get("/favorites",auth, async (req, res) => {
  console.log("TRYING TO FETCH GOALS");
  try {
    const goals = await Goal.find();
    res.status(200).json({
      goals: goals.map((goal) => ({
        id: goal.id,
        text: goal.text,
      })),
    });
    console.log("FETCHED GOALS");
    console.log(goals)
  } catch (err) {
    console.error("ERROR FETCHING GOALS");
    console.error(err.message);
    res.status(500).json({ message: "Failed to load goals." });
  }
});


app.post("/goals",auth, async (req, res) => {
  console.log("TRYING TO STORE GOAL");
  const goalText = req.body.text;

  if (!goalText || goalText.trim().length === 0) {
    console.log("INVALID INPUT - NO TEXT");
    return res.status(422).json({ message: "Invalid goal text." });
  }

  const goal = new Goal({
    text: goalText,
  });

  try {
    await goal.save();
    res
      .status(201)
      .json({ message: "Goal saved", goal: { id: goal.id, text: goalText } });
    console.log("STORED NEW GOAL");
  } catch (err) {
    console.error("ERROR FETCHING GOALS");
    console.error(err.message);
    res.status(500).json({ message: "Failed to save goal." });
  }
});
// I am here
app.post("/favorites", async (req, res) => {
  console.log("TRYING TO FAvorites");
  const movieTitle = req.body.title;

  if (!movieTitle || movieTitle.trim().length === 0) {
    console.log("INVALID INPUT - NO TEXT");
    return res.status(422).json({ message: "Invalid goal text." });
  }

  const user = new mySchemas.User({
    text: movieTitle,
  });

  try {
    await goal.save();
    res
      .status(201)
      .json({ message: "Goal saved", goal: { id: goal.id, text: goalText } });
    console.log("STORED NEW GOAL");
  } catch (err) {
    console.error("ERROR FETCHING GOALS");
    console.error(err.message);
    res.status(500).json({ message: "Failed to save goal." });
  }
});
app.post("/genre", async (req, res) => {
  console.log("TRYING TO STORE Genre");
  const postGenre = req.body.name;

  if (!postGenre || postGenre.trim().length === 0) {
    console.log("INVALID INPUT - NO TEXT");
    return res.status(422).json({ message: "Invalid genre text." });
  }

  const genre = new mySchemas.genre({
    name: postGenre,
  });

  try {
    await genre.save();
    res
      .status(201)
      .json({ message: "Genre saved", genre: { id: genre.id, name: postGenre } });
    console.log("STORED NEW Genre");
    console.log(genre);
  } catch (err) {
    console.error("ERROR FETCHING Genre");
    console.error(err.message);
    res.status(500).json({ message: "Failed to save goal." });
  }
});
app.delete('/delete',async (req,res)=>{
  try {
    await mySchemas.movies.deleteMany()
    res.status(200).json({ message: 'Deleted goal!' });
    console.log('DELETED GOAL');
  } catch (err) {
    console.error('ERROR FETCHING GOALS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete goal.' });
  }
})
app.delete('/deleteUsers',async (req,res)=>{
  try {
    await User.deleteMany()
    res.status(200).json({ message: 'Deleted Users!' });
    console.log('DELETED GOAL');
  } catch (err) {
    console.error('ERROR FETCHING GOALS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete goal.' });
  }
})

app.get("/movies",auth, async (req, res) => {
  console.log("TRYING TO FETCH Movies");
  try {
    const movieData = await mySchemas.movies.find().populate('genre');
    res.status(200).json({
      movies: movieData.map((movie) => ({
        id: movie.id,
        title: movie.title,
        thumbnail:movie.thumbnail,
        genre: movie.genre, 
        extract: movie.extract, 
        year: movie.year, 
        cast: movie.cast
        

      })),
    });
    console.log("FETCHED Movies");
    console.log(movieData)
  } catch (err) {
    console.error("ERROR FETCHING GOALS");
    console.error(err.message);
    res.status(500).json({ message: "Failed to load goals." });
  }
});
app.get('/actor', async (req,res)=>{
  try {
    const movieData = await mySchemas.movies.findOne({cast:'Stephan James'});
    res.status(200).json({
      data:movieData
    });
    console.log("FETCHED Movies");
    console.log(movieData)
  } catch (err) {
    console.error("ERROR FETCHING GOALS");
    console.error(err.message);
    res.status(500).json({ message: "Failed to load goals." });
  }
})
app.post("/addmovie",auth, async (req, res) => {
  console.log("TRYING TO STORE Movie");
  const postMovie = req.body.movieData;
  console.log(postMovie)
  // if (!postGenre || postGenre.trim().length === 0) {
  //   console.log("INVALID INPUT - NO TEXT");
  //   return res.status(422).json({ message: "Invalid genre text." });
  // }
  let genreSchema = mySchemas.genre;
  let tempGenres=[];
  const genres = postMovie.genres;
  for( var i=0;  i<genres.length;i++){
    let genreDB = await genreSchema.findOne({name: genres[i]});
    tempGenres.push(genreDB.id);
  }
  // for( var i=0;  i<genres.length;i++){
  //   let genreDB = await genreSchema.findOne({_id: tempGenres[i]});
  //   console.log(genreDB)
  // }
  console.log(tempGenres)
  const movie = new mySchemas.movies({
    title:postMovie.title,
    thumbnail: postMovie.thumbnail,
    extract:postMovie.extract,
    year: postMovie.year,
    entryDate:postMovie.entryDate,
    genre: tempGenres, 
    cast:postMovie.cast,

  });
console.log(movie)
  try {
    await movie.save();
    res
      .status(201)
      .json({ message: "Movie saved", movie: { id: movie.id , title: movie.title } });
    console.log("STORED NEW Movie");
    
  } catch (err) {
    console.error("ERROR FETCHING Movie");
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});


app.get("/genre",auth, async (req, res) => {
  console.log("TRYING TO FETCH GOALS");
  try {
    const genres = await mySchemas.genre.find();
    
    res.status(200).json({
      genres: genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
      })),
    });
    console.log("FETCHED Genres");
    console.log(genres)
  } catch (err) {
    console.error("ERROR FETCHING Genres");
    console.error(err.message);
    res.status(500).json({ message: "Failed to load Genres." });
  }
});
mongoose.connect(
    `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/course-goals?authSource=admin`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.error("FAILED TO CONNECT TO MONGODB");
        console.error(err);
      } else {
        console.log("CONNECTED TO MONGODB!!");
        app.listen(80);
      }
    }
  );