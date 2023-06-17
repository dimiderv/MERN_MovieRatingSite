const mongoose = require("mongoose");
var Schema = mongoose.Schema;
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

    favorites:[{type:Schema.Types.ObjectId, ref: 'movies'}]
});
 
module.exports = mongoose.model.Users || mongoose.model('Users',UserSchema);