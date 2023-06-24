const User = require('../models/userMode');

const handleLogout = async (req,res) => {
    const cookies = req.cookies;
    console.log("Before logout coookies",cookies)
    if(!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshToken = cookies.jwt; 
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    console.log('worked')
    res.sendStatus(204);
}

module.exports = { handleLogout }

