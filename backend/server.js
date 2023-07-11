const fs = require("fs");
const cookieParser = require('cookie-parser')
const path = require("path");
var ObjectId = require('mongodb').ObjectId; 
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const axios = require("axios").default;
const Goal = require("./models/Goal");
const app = express();
const verifyJWT = require('./middleware/verifyJWT');
// required for registration
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('./models/userMode');
const mySchemas = require('./models/schemas');
const auth = require('./auth');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');

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

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, DELETE,PUT, PATCH, OPTIONS"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   next();
// });




app.use('/register', require('./routes/register'));
app.use('/login',require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));


app.post("/goals", async (req, res) => {
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

app.use(verifyJWT)
/**====================================End of Authentication===========================**/
app.get("/movies", async (req, res) => {
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
    //console.log(movieData)
  } catch (err) {
    console.error("ERROR FETCHING Movies");
    console.error(err.message);
    res.status(500).json({ message: "Failed to load goals." });
  }
});




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


app.get("/favorites", async (req, res) => {
  console.log("TRYING TO get Favorites to user populate('favorites')");
  User.findOne({_id: req.user.userId}).populate({
    path: 'favorites',
    populate: {
      path: 'genre',
    }
  })
  .exec(function(err, result) {
    if (err) {
      // Handle error
      res.status(500).json({message: 'Failed to get favorites.'})
    } else {
      // Access the populated favorites with genre information
      console.log("Before attempting to add to favorites",result)
      res.status(200).json(result.favorites)
    }
  });
    // .then((result)=>{
    //     console.log("Before attempting to add to favorites",result.favorites[0].genre)
    //     res.status(200).json(result.favorites)
    // }).catch(()=>{
    //     res.status(500).json({message: 'Failed to get favorites.'})
    // })

});



// I am here
app.post("/favorites", async (req, res) => {
  console.log("TRYING TO add FAvorites to user");
  const movieTitle = req.body.title || "";  
  if (!movieTitle || movieTitle.trim().length === 0) {
    console.log("INVALID INPUT - NO TEXT");
    return res.status(422).json({ message: "Invalid goal text." });
  }
  const foundMovie = await mySchemas.movies.findOne({title:movieTitle}).exec();
  if(!foundMovie){
    console.log("didnt work")
    res.status(422).json({ message: `No movie with title ${movieTitle}.` });
  }
  console.log(foundMovie)
  console.log(req.user);
  const user = await User.findOne({_id: req.user.userId})
  console.log("Before attempting to add to favorites",user)
  if(user.favorites.includes(foundMovie._id)){
    console.log(`${movieTitle} already exists in Favorites`);
    res.status(422).json({ message: `${movieTitle} Already exists in favorites.` });
  }else{
      user.favorites.push(foundMovie._id)
      console.log(user)
  user.save()
    .then((result)=>{
      console.log(result);
      res.status(200).send({
        message:"Successfully saved movie to favorites"
      })
    }).catch((error)=>{
      console.log(error)
      res.status(500).send({
        message: "Error adding to favorites.",
        error
      })
    })
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
