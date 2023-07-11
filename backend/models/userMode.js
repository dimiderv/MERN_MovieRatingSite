const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const _ = require('underscore');
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required: [true, "Please provide an Email"],
        unique:[true, "Email exists"]
    },

    password:{
        type:String,
        required: [true, "Please provide a password!"],
        unique:false
    },
    username:{
        type:String,
        required:[true, "Please provide a unique username."],
        unique:[true,"Username already exists."]
    }
    ,
    refreshToken:String,
    favorites:[{type:Schema.Types.ObjectId, ref: 'movies'}]
});
 
UserSchema.pre('save', function (next) {
    this.favorites = _.uniq(this.favorites);
    next();
});
module.exports = mongoose.model.Users || mongoose.model('Users',UserSchema);