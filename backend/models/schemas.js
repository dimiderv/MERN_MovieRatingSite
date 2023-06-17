var mongoose = require('mongoose');
const { schema } = require('./Goal');

var Schema = mongoose.Schema;

let moviesSchema = new Schema({
    title:{type:String, required:true,unique:[true, "Movie already exists"]},
    thumbnail: {type:String, required:true},
    extract:{type:String, required:true},
    year: {type:String},
    cast: [{type:String,required:true}],
    entryDate:{type:Date, default: Date.now},
    genre: [{type:Schema.Types.ObjectId, ref: 'genre'}]
});


let genreSchema = new Schema({
    name:{type:String,required:true,unique:[true, "Genre already exists"]}
});

let signupSchema = new Schema({
    email:{type:String, required:true},
    entryDate:{type:Date, default: Date.now}
});

let movies = mongoose.model('movies',moviesSchema,'movies');
let genre = mongoose.model('genre',genreSchema,'genre');
let signup= mongoose.model('signup',signupSchema, 'signup');


let mySchemas= {"movies":movies, "genre":genre,"signup":signup}

module.exports = mySchemas;