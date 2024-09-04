const jwt = require("jsonwebtoken");

const SECRET_KEY = "MyNameIsSunrut007";

export const genreteWebToken = (user) =>{
return jwt.sign({id:user.id,email:user.email},SECRET_KEY,{
    expiresIn:"1h"
});
}

export const verifyToken = (token) =>{
    return jwt.verify(token,SECRET_KEY);
   }

