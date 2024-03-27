const User = require('../models/userMode');
const mySchemas = require("../models/schemas");



const getFavorites = async (req, res) => {
    console.log(`Method ${req.method}, endpoint /favorites`)
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
                return res.status(500).json({message: 'Failed to get favorites.'})
            } else {
                // Access the populated favorites with genre information
                // console.log("Before attempting to add to favorites",result)
                return res.status(200).json(result.favorites)
            }
        });
}
const postFavorites = async (req, res) => {
    console.log(`Method ${req.method}, endpoint /favorites`)
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
        // console.log(user)
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

}
const deleteFavorites = async (req,res)=>{
    const movieTitle = req.body.title || "";
    console.log(`Method ${req.method}, endpoint /favorites, Title: ${movieTitle}`)

    const userId = req.user.userId;

    if(!movieTitle){
        return res.status(400).json({message: 'No movie title in the request'});
    }

    try {
        const user = await User.findById(userId).populate('favorites','title');
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        // console.log(user)
        const index = user.favorites.findIndex(movie=>movie.title ===movieTitle);
        if(index===-1){
            return  res.status(404).json({message: 'Movie not found in favorites'});
        }
        console.log('Index in favorites: ',index)

        user.favorites.splice(index,1);
        await user.save();
        console.log("User after deletion", user.favorites)
        return res.status(200).json({message:`Deleted ${movieTitle} from favorites.`})

    }catch (err){
        console.error('Error removing movie from favorites',err);
        return res.status(500).json({message: 'Failed to remove movie from favorites'});
    }
}

module.exports ={
    getFavorites,
    postFavorites,
    deleteFavorites
}