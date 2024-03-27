const fs = require("fs");
const cookieParser = require('cookie-parser')
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
const TrySchema = require('./models/trySchemas');
const mySchemas = require('./models/schemas');
const auth = require('./auth');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');

// Could be a possible error with new Header
const cors = require("cors");

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement

// Check how it works exactly. Files in case are corsOptions, allowedOrigins, credentials
app.use(credentials);

app.use(cors(corsOptions));


//app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.get('/apicall', async (req, res) => {
  try {
    // Your asynchronous code, for example, a database query
    // In this case, we're simulating a promise-based asynchronous operation
    const result = await someAsyncOperation(); // Replace with your actual asynchronous operation

    // If the operation is successful, respond with a success message
    res.status(200).json({ message: 'API call works!', result });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Simulating an asynchronous operation (replace this with your actual code)
function someAsyncOperation() {
  return new Promise((resolve, reject) => {
    // Simulating a successful asynchronous operation
    // Replace the following line with your actual asynchronous logic
    resolve('Simulated successful result');
    // Simulating an error in the asynchronous operation
    // Uncomment the following line to simulate an error
    // reject(new Error('Simulated error'));
  });
}

app.get('/hello', async (req, res) => {
  await User.findOne({$or: [{ email: "try" }, {username: "try"}]})
  .exec(function(err, result) {
    if (err) {
      // Handle error
      res.status(501).json({message: 'Failed to get favorites.'})
    } else {
      // Access the populated favorites with genre information
      console.log("This is the user document",result)
      res.status(200).json(result)
    }
  });

});

// +++++++++======================================++++++++++++++++++++++++++++===================++++++++++++
app.use('/register', require('./routes/register'));
app.use('/login',require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

//This use verifyJWT
app.use('/favorites',require('./routes/favorites'));
app.use('/user',require('./routes/user'));


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



// Initialization api. Adds Movies to Database.
app.post("/addmovie", async (req, res) => {
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


app.use(verifyJWT)
/**====================================End of Authentication===========================**/
app.get("/movies", async (req, res) => {
  console.log(`Method ${req.method}, endpoint /movies`)
  try {
    const movieData = await mySchemas.movies.find().populate('genre');
    return res.status(200).json({
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
    //console.log(movieData)
  } catch (err) {
    console.error("ERROR FETCHING Movies");
    console.error(err.message);
    return res.status(500).json({ message: "Failed to load goals." });
  }
});




//test api
app.get("/favoritesArray", async (req,res)=>{
  const user = await User.findOne({_id: req.user.userId});
  console.log(user)
  return res.status(200).json(user?.favorites);
})


app.delete("/deletefavorites", async (req, res) => {
  console.log(`Method ${req.method}, endpoint /deleteFavorites`)
  try {
    // Delete all documents in the "favorites" collection
    await User.updateMany({}, { $set: { favorites: [] } });

    res.status(200).json({ message: "All favorites deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting favorites.", error });
  }
});

app.delete('/delete',async (req,res)=>{
  console.log(`Method ${req.method}, endpoint /delete`)
  try {
    await mySchemas.movies.deleteMany()
    res.status(200).json({ message: 'Deleted all movies!' });
    console.log('Deleted All movies');
  } catch (err) {
    console.error('ERROR FETCHING GOALS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete goal.' });
  }
})
app.delete('/deleteUsers',async (req,res)=>{
  console.log(`Method ${req.method}, endpoint: /deleteUsers`)
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
  console.log(`Method ${req.method}, endpoint /actor`)
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
        // app2.listen(4000)
      }
    }
  );

 module.exports = {app,mongoose}