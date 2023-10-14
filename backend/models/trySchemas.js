const mongoose = require("mongoose");

// var Schema = mongoose.Schema;

const TrySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Plkease provide your  first name"]
    }, 
    lastName:{
        type:String, 
        required:[true,"please provide last name"]
    },
    age: {
        type: Number
    }
})


// const TrySchemaModel = mongoose.model('TrySchema',goalSchema);

// module.exports = TrySchemaModel


module.exports = mongoose.model.TrySchema ||  mongoose.model("TrySchema",TrySchema)