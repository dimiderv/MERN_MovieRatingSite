const User = require('../models/userMode');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        'REFRESH-TOKEN',
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const token = jwt.sign(
                {
                    userId: foundUser._id,
                    userEmail: foundUser.email,
                    userName:foundUser.username
                },
                'RANDOM-TOKEN',
                { expiresIn: '10min' }
            );
            res.json({token })
        }
    );
}

module.exports = { handleRefreshToken }