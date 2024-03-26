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
      .json({ message: "Goal save•••••••••••••••d", goal: { id: goal.id, text: goalText } });
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

app.get("/user",async (req,res)=>{
  // console.log(req)
  // should add await i believe
  await User.findOne({$or: [{ email: req.user.userEmail }, {username: req.user.userName}]})
  .exec(function(err, result) {
    if (err) {
      // Handle error
      res.status(500).json({message: 'Failed to get user.'})
    } else {
      // Access the populated favorites with genre information
      console.log("This is the user document",result)
      res.status(200).json(result)
    }
  });
})




app.get("/favorites", async (req, res) => {
  console.log("TRYING TO get Favorites to user populate('favorites')");
  // console.log(req)
 await User.findOne({_id: req.user.userId}).populate({
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
});

//test api
app.get("/favoritesArray", async (req,res)=>{
  const user = await User.findOne({_id: req.user.userId});
  console.log(user)
  return res.status(200).json(user?.favorites);
})

app.delete("/favorites", async (req,res)=>{
  const movieTitle = req.body.title || "";
  const userId = req.user.userId;

  if(!movieTitle){
    return res.status(400).json({message: 'No movie title in the request'});
  }

  try {
    const user = await User.findById(userId).populate('favorites','title');
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }
    console.log(user)
    const index = user.favorites.findIndex(movie=>movie.title ===movieTitle);
    if(index===-1){
      return  res.status(404).json({message: 'Movie not found in favorites'});
    }
    console.log(index)

    user.favorites.splice(index,1);
    await user.save();
    console.log("User after delettion", user)
    return res.status(200).json({message:`Deleted ${movieTitle} from favorites.`})

  }catch (err){
    console.error('Error removing movie from favorites',err);
    res.status(500).json({message: 'Failed to remove movie from favorites'});
  }
})

app.patch("/updateUserDetails", async (req,res)=>{
  // (More efficient) 2. Check if the data have changed (might do it on the frontend)

  
  const {firstName, lastName, birthday,email} = req.body.dataObj;
  const user = await User.findOne({_id: req.user.userId});
  // console.log(user)
  // Should not be allowed any requests. Fix from frontend
  let areTheSame = 0;
  user.firstName !== firstName ?
    (user.firstName = firstName): 
    areTheSame++
  user.lastName !== lastName ?
    (user.lastName = lastName): 
    areTheSame++
    
  const prevEmail = user.email;
  user.email !== email ?
    (user.email = email): 
    areTheSame++
  
  user.birthday !== birthday ?
    (user.birthday = birthday): 
    areTheSame++
  
  if(areTheSame===4){
    res.status(500).send({
      message: "You didn't change any information.",
      prevEmail:prevEmail,
    })
  }else{
    user.save()
    .then((result)=>{
      console.log(result);
      res.status(200).send({
        message:"Successfully updated details!"
        
      })
    }).catch((error)=>{

      // Try throw error or if condition on frontend
      res.status(500).send({
        message: `Error code ${error.code}. Email already exists.`,
        prevEmail:prevEmail,
        error
      })
    })

  }
})


app.patch('/updatePassword',async (req,res)=>{
  const userID= req.user.userId;
  console.log(req.body)
  const {currentPassword,newPassword} = req.body.dataObj;
  console.log(currentPassword,newPassword)
  console.log(currentPassword,newPassword, userID)
  await User.findOne({_id:userID}).then((user)=>{
    bcrypt.compare(currentPassword, user.password)
      .then(( passwordCheck)=>{
        if(!passwordCheck){
          console.log('Passwords dont match')
          return res.status(400).send({
            message:'Passwords do not match'
          });
        }
        if(currentPassword === newPassword){
          return res.status(400).send({
            message:'Current and new password cant be the same'
          })
        }
        bcrypt
        .hash(newPassword, 10)
        .then((hashedPassword)=>{
          user.password = hashedPassword;
          // console.log(user)
          console.log(`Password was updated successfully!`)
          user.save().then(result=>{
            res.status(200).json({
              message:"Successfully updated password"
            })
          })
        })
  }).catch((err)=>{
    console.error(err)
  })


})
})

// I am here
app.post("/favorites", async (req, res) => {
  console.log("TRYING TO add favorites to user");
  const movieTitle = req.body.title || "";  
  if (!movieTitle || movieTitle.trim().length === 0) {
    console.log("INVALID INPUT - NO TEXT");
    return res.status(422).json({ message: "Invalid title text." });
  }
  console.log("Title of movie trying to add ",movieTitle )
  const foundMovie = await mySchemas.movies.findOne({title:movieTitle}).exec();
  if(!foundMovie){
    console.log(`No movie with title ${movieTitle}.` )
    return res.status(422).json({ message: `No movie with title ${movieTitle}.` }); //added the return keyword. 10/01
  }
  // console.log(foundMovie)
  // console.log(req.user);
  const user = await User.findOne({_id: req.user.userId});
  // console.log("Before attempting to add to favorites",user)
  //added it 10/01
  if (!user) {
    console.log("User not found");
    return res.status(404).json({ message: "User not found." });
  }
  //crashes if the movie doesn't exist
  if(user.favorites.includes(foundMovie._id)){
    console.log(`${movieTitle} already exists in Favorites`);
    res.status(422).json({ message: `${movieTitle} already exists in favorites.` });
  }else{
      user.favorites.push(foundMovie._id)
      console.log(user)
  user.save()
    .then((result)=>{
      console.log(result);
      res.status(200).send({
        message:`Successfully saved ${movieTitle} to favorites`
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
app.delete("/deletefavorites", async (req, res) => {
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