const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    text:{type:String,unique:[true, "Movie already exists"]}
});

const GoalModel = mongoose.model('Goal',goalSchema);

module.exports = GoalModel