const jwt = require('jsonwebtoken');
function verifyToken(req,res,next){
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({status:false, message:'Access denied. User is not authorozed to view this page.'});
    }
    try {
        const decode = jwt.verify(token, 'MyNameIsSunrut007');
        req.userId = decode.userId;
        next();
    } catch (error) {
        res.status(401).json({status:false, message:'Invalid token'});
    }
};

module.exports = verifyToken;