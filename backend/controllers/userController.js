const User = require('../models/userMode');
const bcrypt = require("bcrypt");

const getUserDetails = async (req,res)=>{
    console.log(`Method ${req.method}, Endpoint: /user`);
    await User.findOne({$or :[{email:req.user.userEmail},{username:req.user.userName}]})
        .exec((err,result)=>{
            if(err){
                return res.status(500).json({message: 'Failed to get user.'})
            }else{
                return res.status(200).json(result)
            }
        })
}

//PUT
const updateUserPassword = async (req,res) =>{
    console.log(`Method ${req.method}, Endpoint: /user (Update Password)`);
    const userID= req.user.userId;
    // console.log(req.body)
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
}

//PATCH
const updateUserDetails = async (req,res) =>{
    console.log(`Method ${req.method}, Endpoint: /user (Update Details)`);
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
        return res.status(500).send({
            message: "You didn't change any information.",
            prevEmail:prevEmail,
        })
    }else{
        user.save()
            .then((result)=>{
                console.log(result);
                return res.status(200).send({
                    message:"Successfully updated details!"

                })
            }).catch((error)=>{

            // Try throw error or if condition on frontend
            return res.status(500).send({
                message: `Error code ${error.code}. Email already exists.`,
                prevEmail:prevEmail,
                error
            })
        })

    }

}

module.exports ={
    getUserDetails,
    updateUserDetails,
    updateUserPassword
}