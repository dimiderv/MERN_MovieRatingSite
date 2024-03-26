const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        console.log("No bearer token found. ")    
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    // console.log('This is the token for Bearer header ',token)
    jwt.verify(
        token,
        'RANDOM-TOKEN',
        (err, decoded) => {
            if (err) {
                console.log("Invalid token. Token expired 403.")
                return res.status(403).json({message:"Forbidden"})
            }
            console.log('==========Verified===========')
            // console.log("This is from the verifyJWT",decoded)
            // console.log('------------------------------------')
            req.user = decoded; //might be wrong
            next();
        }
    );
}

module.exports = verifyJWT