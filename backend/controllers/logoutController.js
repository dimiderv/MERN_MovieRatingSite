const User = require('../models/userMode');

const handleLogout = async (req,res) => {
    const cookies = req.cookies;
    console.log("Before logout coookies",cookies)
    if(!cookies?.jwt) return res.status(204).json({message:'No cookie found.'}); // no content
    const refreshToken = cookies.jwt; 
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        console.log("User doesn't exist. We just delete the cookie.")
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.status(200).json({message:"User doesn't exist. Cookie deleted."})
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log("Refresh token deleted..")
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json({message: "Logout was successful"});
}

module.exports = { handleLogout }

