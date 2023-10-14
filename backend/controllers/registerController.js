const User = require('../models/userMode');
const bcrypt = require("bcrypt");
const handleNewUser = async (req, res) => {
    const {email, password, username,firstName,lastName,birthday} = req.body;
    if (!email || !password || !username) return res.status(400).json({ 'message': 'Email,Username and password are required.' });    
    // hash the password
    bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new User({
            email: email,
            password: hashedPassword,
            username: username,
            firstName: firstName,
            lastName: lastName,
            birthday: birthday

        });
        // save the new user
        user
            .save()
            // return success if the new user is added to the database successfully
            .then((result) => {
            res.status(201).send({
                message: "User Created Successfully",
                result,
            });
            })
            // catch erroe if the new user wasn't added successfully to the database
            .catch((error) => {
            res.status(500).send({
                message: "Error creating user",
                error,
            });
            });
        })
        // catch error if the password hash isn't successful
        .catch((e) => {
        res.status(500).send({
            message: "Password was not hashed successfully",
            e,
        });
        });
};

module.exports = {handleNewUser};